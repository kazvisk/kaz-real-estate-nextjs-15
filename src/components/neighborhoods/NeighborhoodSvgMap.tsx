'use client';

import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useCallback,
} from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import {
  CATEGORY_COLORS,
  getCategory,
  getFillColor,
  lightenHex,
  NeighborhoodCategory,
} from './neighborhoodCategories';

type Feature = {
  type: 'Feature';
  properties: { name: string; [k: string]: any };
  geometry: any;
};

type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
};

export interface NeighborhoodSvgMapHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  focusNeighborhood: (name: string) => void;
}

interface Props {
  geoJson: FeatureCollection;
  hovered: string | null;
  selected: string | null;
  onHoverChange: (name: string | null, clientX?: number, clientY?: number) => void;
  onSelect: (name: string) => void;
  background?: string;
}

type LabelLine = string;

type PreparedFeature = {
  name: string;
  category: NeighborhoodCategory;
  d: string;
  fill: string;
  centroid: [number, number];
  bbox: [[number, number], [number, number]];
  bboxW: number;
  bboxH: number;
  // Anchor + inscribed-circle radius from polylabel. Anchor is always inside
  // the polygon shape; radius caps how big the label can be without leaving.
  anchor: [number, number];
  anchorRadius: number;
  // Maximum half-extents of an axis-aligned rect centered on the anchor that
  // still stays inside the polygon (more generous than the inscribed circle
  // for elongated shapes).
  anchorHX: number;
  anchorHY: number;
  // Polygon ring used for corner-containment verification.
  anchorRing: Ring;
  fontSize: number;
  labelLines: LabelLine[];
  showLabel: boolean;
};

const MIN_SCALE = 0.9;
const MAX_SCALE = 8;
const ZOOM_STEP = 1.45;

// Approximate character width factor for Manrope medium (500).
const CHAR_W = 0.54;

const charWidth = (fontSize: number) => fontSize * CHAR_W;
const measureLine = (line: string, fontSize: number) => line.length * charWidth(fontSize);

// ---------- Polylabel ("pole of inaccessibility") -------------------------
// Finds the point inside a polygon that is farthest from any edge, and
// returns that distance. We use it to place labels where they can't leak
// out of the polygon shape.

type Ring = [number, number][];

function segDistSq(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  let x = ax;
  let y = ay;
  const dx = bx - ax;
  const dy = by - ay;
  if (dx !== 0 || dy !== 0) {
    const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = bx;
      y = by;
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  const ex = px - x;
  const ey = py - y;
  return ex * ex + ey * ey;
}

function pointToPolygonDist(x: number, y: number, ring: Ring): number {
  let inside = false;
  let minDistSq = Infinity;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const ax = ring[i][0];
    const ay = ring[i][1];
    const bx = ring[j][0];
    const by = ring[j][1];
    if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) {
      inside = !inside;
    }
    const ds = segDistSq(x, y, ax, ay, bx, by);
    if (ds < minDistSq) minDistSq = ds;
  }
  return (inside ? 1 : -1) * Math.sqrt(minDistSq);
}

function polylabel(ring: Ring): { x: number; y: number; d: number } {
  if (ring.length < 3) return { x: 0, y: 0, d: 0 };
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < ring.length; i++) {
    const p = ring[i];
    if (p[0] < minX) minX = p[0];
    if (p[0] > maxX) maxX = p[0];
    if (p[1] < minY) minY = p[1];
    if (p[1] > maxY) maxY = p[1];
  }
  const w = maxX - minX;
  const h = maxY - minY;
  if (w === 0 || h === 0) return { x: minX, y: minY, d: 0 };

  // Coarse grid + iterative refinement. Fast enough for 117 polygons.
  let step = Math.min(w, h) / 10;
  let best = {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
    d: pointToPolygonDist((minX + maxX) / 2, (minY + maxY) / 2, ring),
  };
  for (let x = minX; x <= maxX; x += step) {
    for (let y = minY; y <= maxY; y += step) {
      const d = pointToPolygonDist(x, y, ring);
      if (d > best.d) best = { x, y, d };
    }
  }
  for (let pass = 0; pass < 5; pass++) {
    step /= 2;
    if (step < 0.5) break;
    const lx = Math.max(minX, best.x - step * 2);
    const hx = Math.min(maxX, best.x + step * 2);
    const ly = Math.max(minY, best.y - step * 2);
    const hy = Math.min(maxY, best.y + step * 2);
    for (let x = lx; x <= hx; x += step) {
      for (let y = ly; y <= hy; y += step) {
        const d = pointToPolygonDist(x, y, ring);
        if (d > best.d) best = { x, y, d };
      }
    }
  }
  return best;
}

// Returns the distance from (ax, ay) to the first ring intersection along
// direction (dx, dy). The direction must be a unit vector. Returns +Infinity
// if no intersection is found.
function rayDistanceToRing(
  ax: number,
  ay: number,
  dx: number,
  dy: number,
  ring: Ring,
): number {
  let minT = Infinity;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const p1x = ring[j][0];
    const p1y = ring[j][1];
    const p2x = ring[i][0];
    const p2y = ring[i][1];
    const ex = p2x - p1x;
    const ey = p2y - p1y;
    const det = dx * -ey - dy * -ex; // = -dx*ey + dy*ex
    if (det === 0) continue;
    const rx = p1x - ax;
    const ry = p1y - ay;
    const t = (rx * -ey - ry * -ex) / det;
    const s = (dx * ry - dy * rx) / det;
    if (t > 1e-6 && s >= 0 && s <= 1 && t < minT) minT = t;
  }
  return minT;
}

// True if (x, y) is inside the polygon ring.
function pointInRing(x: number, y: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const ax = ring[i][0];
    const ay = ring[i][1];
    const bx = ring[j][0];
    const by = ring[j][1];
    if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) {
      inside = !inside;
    }
  }
  return inside;
}

type FeatureAnchor = {
  x: number;
  y: number;
  // Inscribed-circle radius (distance from anchor to nearest edge).
  d: number;
  // Axis-aligned half-extents from anchor: how far we can stretch a
  // rectangle centered on the anchor before hitting the polygon boundary.
  hx: number;
  hy: number;
  // Polygon ring used (winning ring on MultiPolygon), kept for corner checks.
  ring: Ring;
};

// Pick the best (largest inscribed-circle) anchor across all rings of a
// Polygon / MultiPolygon feature, plus the available axis-aligned space.
function bestAnchorForFeature(
  feature: any,
  projection: ReturnType<typeof geoMercator>,
): FeatureAnchor {
  const projectRing = (coords: [number, number][]): Ring => {
    const out: Ring = [];
    for (let i = 0; i < coords.length; i++) {
      const p = projection(coords[i]);
      if (p) out.push([p[0], p[1]]);
    }
    return out;
  };

  let rings: Ring[] = [];
  const geo = feature.geometry;
  if (geo?.type === 'Polygon') {
    if (geo.coordinates[0]) rings = [projectRing(geo.coordinates[0])];
  } else if (geo?.type === 'MultiPolygon') {
    rings = geo.coordinates.map((poly: any) => projectRing(poly[0]));
  }

  let bestRing: Ring = [];
  let best = { x: 0, y: 0, d: -Infinity };
  for (const ring of rings) {
    if (ring.length < 3) continue;
    const r = polylabel(ring);
    if (r.d > best.d) {
      best = r;
      bestRing = ring;
    }
  }
  if (!isFinite(best.d) || best.d <= 0 || bestRing.length === 0) {
    return { x: 0, y: 0, d: 0, hx: 0, hy: 0, ring: [] };
  }

  const right = rayDistanceToRing(best.x, best.y, 1, 0, bestRing);
  const left = rayDistanceToRing(best.x, best.y, -1, 0, bestRing);
  const down = rayDistanceToRing(best.x, best.y, 0, 1, bestRing);
  const up = rayDistanceToRing(best.x, best.y, 0, -1, bestRing);
  const hx = Math.min(left, right);
  const hy = Math.min(up, down);

  return {
    x: best.x,
    y: best.y,
    d: best.d,
    hx: isFinite(hx) ? hx : best.d,
    hy: isFinite(hy) ? hy : best.d,
    ring: bestRing,
  };
}

/**
 * Wrap a name into lines that fit within maxWidth (in px) at the given
 * font size. Greedy word wrap, but also splits natural separators like "/".
 */
function wrapLabel(name: string, maxWidth: number, fontSize: number): string[] {
  if (!name) return [];
  // Normalise common separators: " / " -> "/" so split is clean.
  const normalized = name.replace(/\s*\/\s*/g, '/');
  // Try splitting on "/" first (natural break), then on spaces.
  const segments = normalized.split('/').flatMap((seg, i, arr) =>
    i < arr.length - 1 ? [seg + '/'] : [seg],
  );

  const words = segments.flatMap((s) => s.trim().split(/\s+/)).filter(Boolean);
  const lines: string[] = [];
  let line = '';

  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (measureLine(test, fontSize) <= maxWidth || !line) {
      line = test;
    } else {
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  // Strip trailing "/" cosmetics – we kept them to keep the split, but they look bad as line endings.
  return lines.map((l) => l.replace(/\/$/, '').trim()).filter(Boolean);
}

/**
 * Cohesive label sizing via a fixed tier system.
 *
 * Every neighborhood aims for BASE_FONT (the "cohesive baseline"). Only
 * genuinely massive polygons step up to LARGE_FONT. Polygons that can't fit
 * the baseline shrink down to MIN_FONT until the label strictly fits inside
 * the polygon – no overflow, no overlap.
 *
 * Containment is enforced via polylabel's inscribed circle: the label rect's
 * corners must be within `anchorRadius - EDGE_PAD` of the anchor point. Since
 * that circle is by construction entirely inside the polygon shape, the
 * label cannot leak past coastlines or into neighboring polygons.
 */
const BASE_FONT = 12;
const LARGE_FONT = 15;
const MIN_FONT = 4;
// Polygons with an inscribed-circle radius >= this get the larger tier.
const LARGE_TIER_MIN_RADIUS = 55;
// Padding between label edge and polygon edge (in px).
const EDGE_PAD = 2;
// Padding between neighboring labels (in px) so they don't touch.
const LABEL_GAP = 1;
const LINE_HEIGHT = 1.05;

type LabelFit = {
  fontSize: number;
  lines: string[];
  rect: [number, number, number, number]; // [x1, y1, x2, y2]
};

function pickLabelFit(
  name: string,
  ax: number,
  ay: number,
  radius: number,
  hx: number,
  hy: number,
  ring: Ring,
  placed: LabelFit['rect'][],
  startFont: number,
): LabelFit | null {
  const safeR = radius - EDGE_PAD;
  if (safeR <= 0) return null;
  const safeRSq = safeR * safeR;
  // Padded axis-aligned half-extents inside the polygon.
  const safeHX = Math.max(0, hx - EDGE_PAD);
  const safeHY = Math.max(0, hy - EDGE_PAD);
  // Permissive width target for wrapping: prefer the wider extent (the
  // ray-cast horizontal half-extent doubled), so elongated polygons get
  // wide single-line labels rather than wrapping unnecessarily.
  const initialMaxW = Math.max(safeR * 2, safeHX * 2);

  const overlaps = (r: LabelFit['rect']) =>
    placed.some(
      (p) =>
        r[0] < p[2] + LABEL_GAP &&
        r[2] > p[0] - LABEL_GAP &&
        r[1] < p[3] + LABEL_GAP &&
        r[3] > p[1] - LABEL_GAP,
    );

  for (let fs = startFont; fs >= MIN_FONT; fs -= 0.25) {
    const lines = wrapLabel(name, initialMaxW, fs);
    if (lines.length === 0) continue;
    const widest = Math.max(...lines.map((l) => measureLine(l, fs)));
    const totalH = lines.length * fs * LINE_HEIGHT;

    const halfW = widest / 2;
    const halfH = totalH / 2;

    // Two ways to pass containment, in order of strictness:
    //   (a) Inscribed-circle: rect's far corner is within safeR. Always
    //       inside the polygon, even for highly concave shapes.
    //   (b) Axis-aligned extents + corner check: rect fits inside the
    //       cross we measured from the anchor, AND all 4 corners of the
    //       rect are inside the polygon ring (handles concavities).
    const fitsCircle = halfW * halfW + halfH * halfH <= safeRSq;
    let fitsExtent = false;
    if (!fitsCircle && halfW <= safeHX && halfH <= safeHY) {
      fitsExtent =
        pointInRing(ax - halfW, ay - halfH, ring) &&
        pointInRing(ax + halfW, ay - halfH, ring) &&
        pointInRing(ax - halfW, ay + halfH, ring) &&
        pointInRing(ax + halfW, ay + halfH, ring);
    }
    if (!fitsCircle && !fitsExtent) continue;

    const rect: LabelFit['rect'] = [ax - halfW, ay - halfH, ax + halfW, ay + halfH];
    if (overlaps(rect)) continue;

    return { fontSize: fs, lines, rect };
  }
  return null;
}

const NeighborhoodSvgMap = forwardRef<NeighborhoodSvgMapHandle, Props>(function NeighborhoodSvgMap(
  { geoJson, hovered, selected, onHoverChange, onSelect, background },
  ref,
) {
  const bg = background ?? CATEGORY_COLORS.background;
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 800, h: 640 });

  const [transform, setTransform] = useState<{ x: number; y: number; k: number }>({
    x: 0,
    y: 0,
    k: 1,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        if (width > 0 && height > 0) {
          setSize({ w: Math.round(width), h: Math.round(height) });
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prepared = useMemo<{ features: PreparedFeature[] } | null>(() => {
    if (!geoJson || size.w === 0 || size.h === 0) return null;

    const padding = 28;
    const projection = geoMercator().fitExtent(
      [
        [padding, padding],
        [size.w - padding, size.h - padding],
      ],
      geoJson,
    );
    const pathGen = geoPath(projection);

    // Geometry pass – compute shape, centroid, bbox, and the polylabel
    // anchor (largest inscribed circle) for each feature.
    const items: PreparedFeature[] = geoJson.features.map((f) => {
      const name = f.properties?.name ?? '';
      const category = getCategory(name);
      const d = pathGen(f) ?? '';
      const centroid = pathGen.centroid(f) as [number, number];
      const bbox = pathGen.bounds(f) as [[number, number], [number, number]];
      const bboxW = bbox[1][0] - bbox[0][0];
      const bboxH = bbox[1][1] - bbox[0][1];
      const pl = bestAnchorForFeature(f, projection);

      return {
        name,
        category,
        d,
        fill: getFillColor(name, category),
        centroid,
        bbox,
        bboxW,
        bboxH,
        anchor: [pl.x, pl.y] as [number, number],
        anchorRadius: pl.d,
        anchorHX: pl.hx,
        anchorHY: pl.hy,
        anchorRing: pl.ring,
        fontSize: 0,
        labelLines: [],
        showLabel: false,
      };
    });

    // Label placement pass – polygons with the most "breathing room" (the
    // larger of inscribed circle and axis-aligned extents) get placed first;
    // smaller polygons shrink (or hide) to avoid overlapping any
    // already-placed label.
    const placed: LabelFit['rect'][] = [];
    const ordered = items
      .map((f, i) => ({
        i,
        // Approximate rect-area capacity of the anchor: prefer the bigger
        // of the inscribed-square area and the axis-aligned-rect area.
        cap: Math.max(
          f.anchorRadius * f.anchorRadius * 2,
          f.anchorHX * f.anchorHY * 4,
        ),
      }))
      .sort((a, b) => b.cap - a.cap);

    for (const { i } of ordered) {
      const f = items[i];
      const [ax, ay] = f.anchor;
      if (!isFinite(ax) || !isFinite(ay) || f.anchorRadius <= 0) continue;

      const startFont = f.anchorRadius >= LARGE_TIER_MIN_RADIUS ? LARGE_FONT : BASE_FONT;

      const fit = pickLabelFit(
        f.name,
        ax,
        ay,
        f.anchorRadius,
        f.anchorHX,
        f.anchorHY,
        f.anchorRing,
        placed,
        startFont,
      );
      if (!fit) continue;

      f.fontSize = fit.fontSize;
      f.labelLines = fit.lines;
      f.showLabel = true;
      placed.push(fit.rect);
    }

    return { features: items };
  }, [geoJson, size.w, size.h]);

  const clampTransform = useCallback(
    (t: { x: number; y: number; k: number }) => {
      const k = Math.max(MIN_SCALE, Math.min(MAX_SCALE, t.k));
      const maxX = size.w * (k - 1);
      const maxY = size.h * (k - 1);
      const x = Math.max(-maxX, Math.min(maxX, t.x));
      const y = Math.max(-maxY, Math.min(maxY, t.y));
      return { x, y, k };
    },
    [size.w, size.h],
  );

  const zoomAtCenter = useCallback(
    (factor: number) => {
      setTransform((t) => {
        const cx = size.w / 2;
        const cy = size.h / 2;
        const newK = t.k * factor;
        const nx = cx - (cx - t.x) * (newK / t.k);
        const ny = cy - (cy - t.y) * (newK / t.k);
        return clampTransform({ x: nx, y: ny, k: newK });
      });
    },
    [clampTransform, size.w, size.h],
  );

  const focusOn = useCallback(
    (name: string) => {
      if (!prepared) return;
      const feat = prepared.features.find((f) => f.name === name);
      if (!feat) return;
      const [cx, cy] = feat.centroid;
      if (!isFinite(cx) || !isFinite(cy)) return;
      const targetK = 2.4;
      setTransform(
        clampTransform({
          x: size.w / 2 - cx * targetK,
          y: size.h / 2 - cy * targetK,
          k: targetK,
        }),
      );
    },
    [prepared, clampTransform, size.w, size.h],
  );

  useImperativeHandle(
    ref,
    () => ({
      zoomIn: () => zoomAtCenter(ZOOM_STEP),
      zoomOut: () => zoomAtCenter(1 / ZOOM_STEP),
      reset: () => setTransform({ x: 0, y: 0, k: 1 }),
      focusNeighborhood: focusOn,
    }),
    [zoomAtCenter, focusOn],
  );

  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  }>({ active: false, startX: 0, startY: 0, origX: 0, origY: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: transform.x,
      origY: transform.y,
      moved: false,
    };
    (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 3) dragRef.current.moved = true;
    setTransform((t) =>
      clampTransform({
        x: dragRef.current.origX + dx,
        y: dragRef.current.origY + dy,
        k: t.k,
      }),
    );
  };

  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    try {
      (e.currentTarget as SVGSVGElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) return;
      e.preventDefault();
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setTransform((t) => {
        const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
        const newK = t.k * factor;
        const nx = mx - (mx - t.x) * (newK / t.k);
        const ny = my - (my - t.y) * (newK / t.k);
        return clampTransform({ x: nx, y: ny, k: newK });
      });
    },
    [clampTransform],
  );

  const handleFeatureClick = (name: string) => {
    if (dragRef.current.moved) return;
    onSelect(name);
  };

  if (!prepared) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ background: bg }}
      />
    );
  }

  const { features } = prepared;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{
        background: `radial-gradient(ellipse at 50% 35%, ${lightenHex(bg, 0.04)} 0%, ${bg} 70%)`,
        overflow: 'hidden',
      }}
    >
      <svg
        ref={svgRef}
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        style={{
          display: 'block',
          cursor: dragRef.current.active ? 'grabbing' : hovered ? 'pointer' : 'grab',
          userSelect: 'none',
          touchAction: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={(e) => {
          onPointerUp(e);
          onHoverChange(null);
        }}
        onWheel={onWheel}
      >
        <defs>
          <filter id="nbhdSelectedGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}
          style={{ transition: dragRef.current.active ? 'none' : 'transform 240ms ease' }}
        >
          {features.map((f) => {
            const isHovered = hovered === f.name;
            const isSelected = selected === f.name;
            const fill = isSelected
              ? lightenHex(f.fill, 0.22)
              : isHovered
              ? lightenHex(f.fill, 0.12)
              : f.fill;
            const stroke = isSelected
              ? CATEGORY_COLORS.borderSelected
              : CATEGORY_COLORS.border;
            return (
              <path
                key={f.name}
                d={f.d}
                fill={fill}
                stroke={stroke}
                strokeWidth={(isSelected ? 2.2 : 0.9) / transform.k}
                strokeLinejoin="round"
                filter={isSelected ? 'url(#nbhdSelectedGlow)' : undefined}
                onMouseEnter={(e) => onHoverChange(f.name, e.clientX, e.clientY)}
                onMouseMove={(e) => onHoverChange(f.name, e.clientX, e.clientY)}
                onMouseLeave={() => onHoverChange(null)}
                onClick={() => handleFeatureClick(f.name)}
                style={{ transition: 'fill 160ms ease' }}
              />
            );
          })}

          {/* Labels above all fills. Anchored at each polygon's pole of
              inaccessibility so they always sit deep inside the shape, and
              sized to fit inside that anchor's inscribed circle so they
              physically cannot leak past the polygon edge. */}
          {features.map((f) => {
            if (!f.showLabel) return null;
            const [ax, ay] = f.anchor;
            if (!isFinite(ax) || !isFinite(ay)) return null;

            const fs = f.fontSize;
            const lineHeight = fs * LINE_HEIGHT;
            const startY = ay - ((f.labelLines.length - 1) * lineHeight) / 2;

            return (
              <g key={`label-${f.name}`} pointerEvents="none">
                {f.labelLines.map((l, i) => (
                  <text
                    key={i}
                    x={ax}
                    y={startY + i * lineHeight}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={fs}
                    fontWeight={500}
                    fill={CATEGORY_COLORS.labelOnDark}
                    style={{
                      fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif',
                      letterSpacing: '-0.018em',
                    }}
                  >
                    {l}
                  </text>
                ))}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
});

export default NeighborhoodSvgMap;
