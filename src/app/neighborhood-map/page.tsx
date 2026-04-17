'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NeighborhoodSvgMap, {
  NeighborhoodSvgMapHandle,
} from '@/components/neighborhoods/NeighborhoodSvgMap';
import { getNeighborhoodStats } from '@/components/neighborhoods/neighborhoodStats';

const BG = '#131925';

function fmtPrice(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

export default function NeighborhoodMapPage() {
  const mapRef = useRef<NeighborhoodSvgMapHandle>(null);
  const [geoJson, setGeoJson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetch('/data/SF_Find_Neighborhoods_20251109.geojson')
      .then((r) => r.json())
      .then((d) => {
        setGeoJson(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allNames = useMemo<string[]>(() => {
    if (!geoJson) return [];
    return geoJson.features
      .map((f: any) => f.properties?.name as string)
      .filter(Boolean)
      .sort((a: string, b: string) => a.localeCompare(b));
  }, [geoJson]);

  const filtered = search.trim()
    ? allNames.filter((n) => n.toLowerCase().includes(search.toLowerCase()))
    : allNames;

  const stats = selected ? getNeighborhoodStats(selected) : null;

  const onHoverChange = useCallback(
    (name: string | null, clientX?: number, clientY?: number) => {
      setHovered(name);
      if (clientX !== undefined && clientY !== undefined) {
        setTooltipPos({ x: clientX, y: clientY });
      }
    },
    [],
  );

  const onSelect = useCallback((name: string) => {
    setSelected((prev) => (prev === name ? null : name));
  }, []);

  const selectAndFocus = (name: string) => {
    setSelected(name);
    setShowSearch(false);
    setSearch('');
    requestAnimationFrame(() => mapRef.current?.focusNeighborhood(name));
  };

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden"
      style={{ fontFamily: 'Manrope, sans-serif', backgroundColor: BG }}
    >
      {/* Navigation Bar — matches /about */}
      <nav
        className="relative z-40 flex items-center justify-between px-8 md:px-16 py-8 text-white"
        style={{ backgroundColor: BG }}
      >
        <div className="flex items-center gap-4 text-white font-bold">
          <a href="/">
            <img src="/kvlogo.svg" alt="Kaz Viskanta Realty Logo" className="h-16 w-auto" />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-12">
          <a
            href="/"
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer"
            style={{ fontSize: '0.95rem' }}
          >
            HOME
          </a>
          <a
            href="/about"
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer"
            style={{ fontSize: '0.95rem' }}
          >
            ABOUT
          </a>
          <a
            href="/search"
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer"
            style={{ fontSize: '0.95rem' }}
          >
            SEARCH
          </a>
          <a
            href="mailto:kaz@kazviskrealty.com?subject=Looking to Buy in San Francisco&body=Hi Kaz, I'm interested in buying a property in San Francisco. Please contact me."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer"
            style={{ fontSize: '0.95rem' }}
          >
            BUY
          </a>
          <a
            href="mailto:kaz@kazviskrealty.com?subject=Looking to Sell in San Francisco&body=Hi Kaz, I'm interested in selling my property in San Francisco. Please contact me."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer"
            style={{ fontSize: '0.95rem' }}
          >
            SELL
          </a>
          <a
            href="/neighborhood-map"
            className="font-medium opacity-100 cursor-pointer border-b border-white pb-1"
            style={{ fontSize: '0.95rem' }}
          >
            NEIGHBORHOODS
          </a>
          <a
            href="mailto:kaz@kazviskrealty.com?subject=Contact Kaz Viskanta&body=Hi Kaz, I'd like to get in touch about your real estate services."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer"
            style={{ fontSize: '0.95rem' }}
          >
            CONTACT
          </a>
        </div>

        <button
          className="text-white font-normal hover:opacity-75 transition-opacity duration-300"
          style={{ fontSize: '0.95rem' }}
        >
          MENU ☰
        </button>
      </nav>

      {/* Hero / Header section */}
      <section className="px-6 md:px-16 pt-10 pb-12" style={{ backgroundColor: BG }}>
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-medium text-white mb-4"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            San Francisco Neighborhoods
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl leading-relaxed"
          >
            Click any neighborhood on the map to see market insights, pricing, and local character.
            Drag to pan, use the controls to zoom, or search for a specific area.
          </motion.p>
        </div>
      </section>

      {/* Map + Panel section */}
      <section className="px-6 md:px-16 pb-20" style={{ backgroundColor: BG }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Map container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 relative rounded-2xl overflow-hidden"
            style={{
              background: '#0b111c',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '72vh',
              boxShadow: '0 30px 80px -30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div
                  className="w-8 h-8 rounded-full border-2 animate-spin"
                  style={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderTopColor: 'rgba(255,255,255,0.7)',
                  }}
                />
              </div>
            )}

            {!loading && geoJson && (
              <NeighborhoodSvgMap
                ref={mapRef}
                geoJson={geoJson}
                hovered={hovered}
                selected={selected}
                onHoverChange={onHoverChange}
                onSelect={onSelect}
                background="#0b111c"
              />
            )}

            {/* Top-right control stack */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <ControlButton ariaLabel="Zoom in" onClick={() => mapRef.current?.zoomIn()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </ControlButton>
              <ControlButton ariaLabel="Zoom out" onClick={() => mapRef.current?.zoomOut()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14" />
                </svg>
              </ControlButton>
              <div className="relative">
                <ControlButton
                  ariaLabel="Search neighborhoods"
                  onClick={() => {
                    setShowSearch((s) => !s);
                    setSearch('');
                  }}
                  active={showSearch}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </ControlButton>

                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-12 top-0 w-72 rounded-2xl overflow-hidden"
                      style={{
                        background: 'rgba(19,25,37,0.95)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      <div
                        className="p-3 border-b"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <input
                          autoFocus
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Type a neighborhood..."
                          className="w-full bg-transparent outline-none text-sm text-white placeholder-white/30"
                        />
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {filtered.length === 0 && (
                          <p
                            className="px-4 py-3 text-sm"
                            style={{ color: 'rgba(255,255,255,0.4)' }}
                          >
                            No results
                          </p>
                        )}
                        {filtered.map((name) => (
                          <button
                            key={name}
                            onClick={() => selectAndFocus(name)}
                            className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-150"
                            style={{
                              color: selected === name ? '#ffffff' : 'rgba(255,255,255,0.75)',
                              background:
                                selected === name ? 'rgba(255,255,255,0.1)' : 'transparent',
                              fontWeight: selected === name ? 600 : 400,
                            }}
                            onMouseEnter={(e) => {
                              if (selected !== name)
                                (e.currentTarget as HTMLButtonElement).style.background =
                                  'rgba(255,255,255,0.05)';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background =
                                selected === name ? 'rgba(255,255,255,0.1)' : 'transparent';
                            }}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* MLS footnote */}
            <div
              className="absolute bottom-4 left-4 pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', letterSpacing: '0.01em' }}
            >
              Rolling 6 months of data is pulled from MLS weekly
            </div>

            {/* Legend */}
            <div
              className="absolute bottom-4 right-4 flex items-center gap-4 px-4 py-2.5 rounded-full pointer-events-none hidden md:flex"
              style={{
                background: 'rgba(11,17,28,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {[
                { c: '#2c4e78', label: 'Residential' },
                { c: '#3d5a5e', label: 'Parks' },
                { c: '#1a2233', label: 'Commercial' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-sm"
                    style={{ background: l.c, border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}
                  >
                    {l.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Hover tooltip */}
            <AnimatePresence>
              {hovered && hovered !== selected && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="fixed pointer-events-none z-30 px-3 py-1.5 rounded-lg"
                  style={{
                    left: tooltipPos.x + 14,
                    top: tooltipPos.y + 14,
                    background: 'rgba(10,14,22,0.92)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {hovered}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Side panel */}
          <div className="lg:w-80 shrink-0">
            <AnimatePresence mode="wait">
              {selected && stats ? (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl overflow-hidden flex flex-col bg-white/5 backdrop-blur-sm"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="px-6 pt-6 pb-4 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <button
                      onClick={() => setSelected(null)}
                      className="text-[11px] font-semibold mb-3 flex items-center gap-1.5 transition-opacity hover:opacity-60 text-gray-400"
                      style={{ letterSpacing: '0.12em' }}
                    >
                      ← CLEAR
                    </button>
                    <h2
                      className="font-medium text-white"
                      style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}
                    >
                      {selected}
                    </h2>
                    <p className="text-xs mt-1 text-gray-400">San Francisco, CA</p>
                  </div>

                  <div
                    className="grid grid-cols-2 gap-px"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    {[
                      { label: 'Median House', value: fmtPrice(stats.medianHousePrice) },
                      { label: 'Median Condo', value: fmtPrice(stats.medianCondoPrice) },
                      {
                        label: 'House $/sqft',
                        value: `$${Math.round(stats.housePricePerSqft)}`,
                      },
                      {
                        label: 'Condo $/sqft',
                        value: `$${Math.round(stats.condoPricePerSqft)}`,
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="px-5 py-4"
                        style={{ background: 'rgba(19,25,37,0.7)' }}
                      >
                        <p
                          className="text-[10px] mb-1 uppercase text-gray-400"
                          style={{ letterSpacing: '0.12em' }}
                        >
                          {s.label}
                        </p>
                        <p
                          className="font-medium text-white"
                          style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}
                        >
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="px-6 py-5 border-t space-y-4"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    {[
                      { label: 'Walk Score', value: stats.walkScore },
                      { label: 'Transit Score', value: stats.transitScore },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between mb-1.5">
                          <span
                            className="text-[10px] uppercase text-gray-400"
                            style={{ letterSpacing: '0.12em' }}
                          >
                            {s.label}
                          </span>
                          <span className="text-xs font-semibold text-white">{s.value}</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: 'rgba(255,255,255,0.08)' }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.value}%` }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full"
                            style={{ background: 'rgba(255,255,255,0.85)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {stats.description && (
                    <div
                      className="px-6 py-4 border-t flex-1"
                      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <p
                        className="text-gray-300"
                        style={{ fontSize: '0.88rem', lineHeight: '1.65' }}
                      >
                        {stats.description}
                      </p>
                    </div>
                  )}

                  <div
                    className="px-6 py-5 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <a
                      href={`mailto:kaz@kazviskrealty.com?subject=Interested in ${selected}&body=Hi Kaz, I'd like to learn more about properties in ${selected}.`}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl text-sm"
                    >
                      Ask Kaz about {selected}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
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
                  className="rounded-2xl flex flex-col items-center justify-center text-center px-8 py-12 bg-white/5 backdrop-blur-sm"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    minHeight: '300px',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <p
                    className="font-medium mb-2 text-white"
                    style={{ fontSize: '1rem' }}
                  >
                    Select a neighborhood
                  </p>
                  <p className="text-gray-400" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                    Click any area on the map to see market stats, pricing, and local insights.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

function ControlButton({
  children,
  onClick,
  ariaLabel,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 backdrop-blur-xl"
      style={{
        background: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.08)',
        color: active ? '#0e131e' : '#ffffff',
        border: active
          ? '1px solid rgba(255,255,255,0.9)'
          : '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        if (!active)
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)';
      }}
      onMouseLeave={(e) => {
        if (!active)
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
      }}
    >
      {children}
    </button>
  );
}
