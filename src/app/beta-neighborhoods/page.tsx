'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Map, Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import type { MapRef, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import { motion, AnimatePresence } from 'framer-motion';
import { getNeighborhoodStats } from '@/components/neighborhoods/neighborhoodStats';

// Burgundy palette matching the screenshot
const COLOR_DEFAULT   = 'rgba(120, 30, 40, 0.82)';
const COLOR_HOVER     = 'rgba(160, 45, 55, 0.92)';
const COLOR_SELECTED  = 'rgba(220, 60, 70, 0.95)';
const COLOR_BORDER    = 'rgba(255, 255, 255, 0.55)';
const COLOR_BORDER_SEL= 'rgba(255, 255, 255, 1)';

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

export default function BetaNeighborhoodsPage() {
  const mapRef = useRef<MapRef>(null);
  const [geoJson, setGeoJson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetch('/data/SF_Find_Neighborhoods_20251109.geojson')
      .then(r => r.json())
      .then(d => { setGeoJson(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getName = (f: any): string => f?.properties?.name ?? f?.properties?.nhood ?? '';

  const allNames: string[] = geoJson
    ? geoJson.features.map(getName).filter(Boolean).sort()
    : [];

  const filtered = search.trim()
    ? allNames.filter(n => n.toLowerCase().includes(search.toLowerCase()))
    : [];

  const stats = selected ? getNeighborhoodStats(selected) : null;

  const fillColor: any = [
    'case',
    ['==', ['get', 'name'], selected ?? ''], COLOR_SELECTED,
    ['==', ['get', 'name'], hovered ?? ''],  COLOR_HOVER,
    COLOR_DEFAULT,
  ];

  const lineWidth: any = [
    'case',
    ['==', ['get', 'name'], selected ?? ''], 2,
    1,
  ];

  const lineColor: any = [
    'case',
    ['==', ['get', 'name'], selected ?? ''], COLOR_BORDER_SEL,
    COLOR_BORDER,
  ];

  const onMouseMove = useCallback((e: MapLayerMouseEvent) => {
    const f = e.features?.[0];
    setHovered(f ? getName(f) : null);
  }, []);

  const onMouseLeave = useCallback(() => setHovered(null), []);

  const onClick = useCallback((e: MapLayerMouseEvent) => {
    const f = e.features?.[0];
    if (f) {
      const name = getName(f);
      setSelected(prev => prev === name ? null : name);
    }
  }, []);

  const flyTo = (name: string) => {
    if (!geoJson || !mapRef.current) return;
    const feature = geoJson.features.find((f: any) => getName(f) === name);
    if (!feature) return;
    // Compute rough centroid
    const coords: number[][] = [];
    const collect = (arr: any) => {
      if (typeof arr[0] === 'number') { coords.push(arr as number[]); return; }
      arr.forEach(collect);
    };
    collect(feature.geometry.coordinates);
    if (!coords.length) return;
    const lng = coords.reduce((s, c) => s + c[0], 0) / coords.length;
    const lat = coords.reduce((s, c) => s + c[1], 0) / coords.length;
    mapRef.current.flyTo({ center: [lng, lat], zoom: 14, duration: 800 });
  };

  const selectAndFly = (name: string) => {
    setSelected(name);
    setSearch('');
    flyTo(name);
  };

  return (
    <main className="min-h-screen w-full flex flex-col" style={{ fontFamily: 'Manrope, sans-serif', background: '#0a0d14' }}>

      {/* Nav */}
      <nav className="relative z-40 flex items-center justify-between px-8 md:px-16 py-8 text-white bg-[#0a0d14]">
        <div className="flex items-center gap-4 text-white font-bold">
          <a href="/"><img src="/kvlogo.svg" alt="Kaz Viskanta Realty Logo" className="h-16 w-auto" /></a>
        </div>
        <div className="hidden md:flex items-center gap-12">
          <a href="/"          className="font-medium hover:opacity-75 transition-opacity" style={{ fontSize: '0.95rem' }}>HOME</a>
          <a href="/about"     className="font-medium hover:opacity-75 transition-opacity" style={{ fontSize: '0.95rem' }}>ABOUT</a>
          <a href="/search"    className="font-medium hover:opacity-75 transition-opacity" style={{ fontSize: '0.95rem' }}>SEARCH</a>
          <a href="mailto:kaz@kazviskrealty.com?subject=Looking to Buy in San Francisco" className="font-medium hover:opacity-75 transition-opacity" style={{ fontSize: '0.95rem' }}>BUY</a>
          <a href="mailto:kaz@kazviskrealty.com?subject=Looking to Sell in San Francisco" className="font-medium hover:opacity-75 transition-opacity" style={{ fontSize: '0.95rem' }}>SELL</a>
          <a href="/beta-neighborhoods" className="font-medium border-b border-white pb-1" style={{ fontSize: '0.95rem' }}>NEIGHBORHOODS</a>
          <a href="mailto:kaz@kazviskrealty.com?subject=Contact Kaz Visk Realty" className="font-medium hover:opacity-75 transition-opacity" style={{ fontSize: '0.95rem' }}>CONTACT</a>
        </div>
        <button className="text-white font-normal hover:opacity-75 transition-opacity" style={{ fontSize: '0.95rem' }}>MENU ☰</button>
      </nav>

      {/* Header row */}
      <div className="px-8 md:px-16 pt-8 pb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}>
            Explore
          </p>
          <h1 className="text-white font-medium" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            San Francisco Neighborhoods
          </h1>
        </div>

        {/* Search */}
        <div className="relative">
          <button
            onClick={() => { setShowSearch(s => !s); setSearch(''); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Search neighborhoods
          </button>
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-12 w-72 rounded-2xl overflow-hidden z-50"
                style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
              >
                <div className="p-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <input
                    autoFocus
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Type a neighborhood..."
                    className="w-full bg-transparent text-white placeholder-white/30 outline-none text-sm"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {(search.trim() ? filtered : allNames).map(name => (
                    <button
                      key={name}
                      onClick={() => { selectAndFly(name); setShowSearch(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-150"
                      style={{ color: selected === name ? '#fff' : 'rgba(255,255,255,0.6)', background: selected === name ? 'rgba(220,60,70,0.2)' : 'transparent' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.background = selected === name ? 'rgba(220,60,70,0.2)' : 'transparent')}
                    >
                      {name}
                    </button>
                  ))}
                  {search.trim() && filtered.length === 0 && (
                    <p className="px-4 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No results</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Map + Panel */}
      <div className="flex-1 flex flex-col md:flex-row gap-0 px-8 md:px-16 pb-8 gap-4">

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 rounded-2xl overflow-hidden relative"
          style={{ minHeight: '70vh', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 32px 64px -12px rgba(0,0,0,0.7)' }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#111827] z-10">
              <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white/70 animate-spin" />
            </div>
          )}
          {!loading && geoJson && (
            <Map
              ref={mapRef}
              initialViewState={{ longitude: -122.435, latitude: 37.758, zoom: 11.6 }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json"
              interactiveLayerIds={['neighborhoods-fill']}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              cursor={hovered ? 'pointer' : 'default'}
              attributionControl={false}
            >
              <NavigationControl position="top-right" showCompass={false} />

              <Source id="neighborhoods" type="geojson" data={geoJson}>
                {/* Fill */}
                <Layer
                  id="neighborhoods-fill"
                  type="fill"
                  paint={{ 'fill-color': fillColor, 'fill-opacity': 1 }}
                />
                {/* Border */}
                <Layer
                  id="neighborhoods-line"
                  type="line"
                  paint={{ 'line-color': lineColor, 'line-width': lineWidth, 'line-opacity': 0.9 }}
                />
                {/* Labels */}
                <Layer
                  id="neighborhoods-label"
                  type="symbol"
                  layout={{
                    'text-field': ['get', 'name'],
                    'text-font': ['Noto Sans Regular'],
                    'text-size': ['interpolate', ['linear'], ['zoom'], 11, 9, 13, 12, 15, 14],
                    'text-max-width': 8,
                    'text-anchor': 'center',
                    'text-allow-overlap': false,
                    'text-ignore-placement': false,
                  }}
                  paint={{
                    'text-color': 'rgba(255,255,255,0.9)',
                    'text-halo-color': 'rgba(0,0,0,0.5)',
                    'text-halo-width': 1,
                  }}
                />
              </Source>
            </Map>
          )}

          {/* Hover tooltip */}
          <AnimatePresence>
            {hovered && hovered !== selected && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute bottom-4 left-4 px-4 py-2 rounded-xl pointer-events-none"
                style={{ background: 'rgba(15,18,28,0.92)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
              >
                <p className="text-white text-sm font-medium">{hovered}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Click to explore</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rolling 6 months note */}
          <div
            className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg pointer-events-none"
            style={{ background: 'rgba(15,18,28,0.8)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Rolling 6 months of data · MLS weekly</p>
          </div>
        </motion.div>

        {/* Side panel */}
        <div className="md:w-80 shrink-0">
          <AnimatePresence mode="wait">
            {selected && stats ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-2xl overflow-hidden flex flex-col"
                style={{ background: '#111520', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Panel header */}
                <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-xs font-medium mb-3 flex items-center gap-1.5 transition-opacity hover:opacity-60"
                    style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}
                  >
                    ← CLEAR
                  </button>
                  <h2 className="text-white font-medium" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em' }}>{selected}</h2>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>San Francisco, CA</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  {[
                    { label: 'Median House', value: fmt(stats.medianHousePrice) },
                    { label: 'Median Condo', value: fmt(stats.medianCondoPrice) },
                    { label: 'House $/sqft', value: `$${Math.round(stats.housePricePerSqft)}` },
                    { label: 'Condo $/sqft', value: `$${Math.round(stats.condoPricePerSqft)}` },
                  ].map(s => (
                    <div key={s.label} className="px-5 py-4" style={{ background: '#111520' }}>
                      <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{s.label}</p>
                      <p className="text-white font-medium" style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Score bars */}
                <div className="px-6 py-5 border-t space-y-4" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  {[
                    { label: 'Walk Score', value: stats.walkScore },
                    { label: 'Transit Score', value: stats.transitScore },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{s.label}</span>
                        <span className="text-xs font-semibold text-white">{s.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.value}%` }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: 'rgba(220,60,70,0.85)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                {stats.description && (
                  <div className="px-6 py-4 border-t flex-1" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: '1.65' }}>{stats.description}</p>
                  </div>
                )}

                {/* CTA */}
                <div className="px-6 py-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <a
                    href={`mailto:kaz@kazviskrealty.com?subject=Interested in ${selected}&body=Hi Kaz, I'd like to learn more about properties in ${selected}.`}
                    className="block w-full text-center py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-85"
                    style={{ background: '#ffffff', color: '#000000', letterSpacing: '0.04em' }}
                  >
                    ASK KAZ ABOUT {selected.toUpperCase()}
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-2xl flex flex-col items-center justify-center text-center px-8 py-12"
                style={{ background: '#111520', border: '1px solid rgba(255,255,255,0.08)', minHeight: '300px' }}
              >
                <div className="w-10 h-10 rounded-full mb-4 flex items-center justify-center" style={{ background: 'rgba(220,60,70,0.12)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(220,60,70,0.8)" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                </div>
                <p className="text-white font-medium mb-2" style={{ fontSize: '0.95rem' }}>Select a neighborhood</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', lineHeight: '1.6' }}>
                  Click any area on the map to see market stats, pricing, and more.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
