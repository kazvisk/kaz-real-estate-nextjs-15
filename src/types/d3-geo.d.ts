declare module 'd3-geo' {
  type GeoJsonObject = any;

  export interface GeoProjection {
    (point: [number, number]): [number, number] | null;
    invert?: (point: [number, number]) => [number, number] | null;
    scale(scale: number): this;
    scale(): number;
    translate(point: [number, number]): this;
    translate(): [number, number];
    center(point: [number, number]): this;
    center(): [number, number];
    fitSize(size: [number, number], object: GeoJsonObject): this;
    fitExtent(extent: [[number, number], [number, number]], object: GeoJsonObject): this;
  }

  export interface GeoPath {
    (object: GeoJsonObject): string | null;
    area(object: GeoJsonObject): number;
    bounds(object: GeoJsonObject): [[number, number], [number, number]];
    centroid(object: GeoJsonObject): [number, number];
    projection(proj: GeoProjection | null): this;
    projection(): GeoProjection | null;
  }

  export function geoMercator(): GeoProjection;
  export function geoPath(projection?: GeoProjection | null): GeoPath;
  export function geoBounds(object: GeoJsonObject): [[number, number], [number, number]];
  export function geoCentroid(object: GeoJsonObject): [number, number];
  export function geoArea(object: GeoJsonObject): number;
}
