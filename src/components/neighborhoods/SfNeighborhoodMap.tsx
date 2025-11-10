'use client';

/**
 * Interactive San Francisco Neighborhood Map Component
 *
 * This component renders a zoomable, pannable SVG map of SF neighborhoods using react-simple-maps.
 * Features:
 * - Click to select a neighborhood
 * - Hover effects for better UX
 * - Visual highlight for selected neighborhood
 * - Zoom controls and search functionality
 * - Centered labels for each neighborhood
 * - Optimized for both desktop and mobile views
 */

import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Annotation,
} from 'react-simple-maps';
import { geoCentroid, geoArea } from 'd3-geo';
import { SfNeighborhoodFeature } from './types';

interface SfNeighborhoodMapProps {
  /** GeoJSON data for SF neighborhoods */
  geoJsonData: any;
  /** Callback when a neighborhood is selected */
  onSelect: (name: string, feature: SfNeighborhoodFeature) => void;
  /** Currently selected neighborhood name */
  selectedName?: string | null;
}

export default function SfNeighborhoodMap({
  geoJsonData,
  onSelect,
  selectedName,
}: SfNeighborhoodMapProps) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [zoom, setZoom] = useState(2.5);
  const [center, setCenter] = useState<[number, number]>([-122.435, 37.76]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const defaultCenter: [number, number] = [-122.435, 37.76];
  const defaultZoom = 2.5;

  // Get all neighborhood names for search
  const allNeighborhoods = useMemo(() => {
    if (!geoJsonData?.features) return [];
    return geoJsonData.features.map((f: any) => f.properties?.name || 'Unknown');
  }, [geoJsonData]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = allNeighborhoods.filter((name: string) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // Handle search result selection
  const handleSearchSelect = (name: string) => {
    const feature = geoJsonData.features.find(
      (f: any) => f.properties?.name === name
    );
    if (feature) {
      onSelect(name, feature);
      setSearchQuery('');
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.5);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.5, 0.5));
  };

  // Recenter map
  const handleRecenter = () => {
    setCenter(defaultCenter);
    setZoom(defaultZoom);
  };

  // Handle move end with boundary constraints
  const handleMoveEnd = (position: any) => {
    const newZoom = position.zoom;
    const newCenter = position.coordinates as [number, number];

    // Define boundaries for SF (approximate bounding box)
    const minLng = -122.52;
    const maxLng = -122.35;
    const minLat = 37.70;
    const maxLat = 37.83;

    // Calculate allowed pan range based on zoom level
    // At lower zoom, allow less panning; at higher zoom, allow more
    const panFactor = Math.max(0.1, Math.min(1, (newZoom - 1) / 3));
    const lngRange = (maxLng - minLng) * (1 - panFactor) / 2;
    const latRange = (maxLat - minLat) * (1 - panFactor) / 2;

    // Constrain center to boundaries
    const constrainedLng = Math.max(
      minLng + lngRange,
      Math.min(maxLng - lngRange, newCenter[0])
    );
    const constrainedLat = Math.max(
      minLat + latRange,
      Math.min(maxLat - latRange, newCenter[1])
    );

    setCenter([constrainedLng, constrainedLat]);
    setZoom(newZoom);
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-slate-900 relative overflow-hidden">
      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Zoom Controls */}
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded shadow-lg flex items-center justify-center transition-colors"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded shadow-lg flex items-center justify-center transition-colors"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        {/* Recenter Button */}
        <button
          onClick={handleRecenter}
          className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded shadow-lg flex items-center justify-center transition-colors"
          aria-label="Recenter map"
          title="Recenter map"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>

        {/* Search Toggle */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded shadow-lg flex items-center justify-center transition-colors"
          aria-label="Search neighborhoods"
          title="Search neighborhoods"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Search Panel */}
      {showSearch && (
        <div className="absolute top-4 left-4 z-20 bg-white rounded-lg shadow-lg p-4 w-64">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search neighborhoods..."
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-900"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {searchResults.length > 0 && (
            <div className="mt-2 max-h-64 overflow-y-auto">
              {searchResults.map((name) => (
                <button
                  key={name}
                  onClick={() => handleSearchSelect(name)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-800 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="mt-2 text-sm text-gray-500 px-3 py-2">
              No neighborhoods found
            </div>
          )}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [-122.44, 37.76],
          scale: 85000,
        }}
        width={800}
        height={600}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ZoomableGroup
          center={center}
          zoom={zoom}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoJsonData}>
            {({ geographies }) =>
              geographies.map((geo: any) => {
                const name = geo.properties?.name || 'Unknown';
                const isSelected = name === selectedName;
                const isHovered = name === hoveredName;

                return (
                  <Geography
                    key={geo.rsmKey || name}
                    geography={geo}
                    onClick={() => {
                      onSelect(name, geo as SfNeighborhoodFeature);
                    }}
                    onMouseEnter={() => setHoveredName(name)}
                    onMouseLeave={() => setHoveredName(null)}
                    style={{
                      default: {
                        fill: isSelected ? 'rgba(153, 27, 27, 0.7)' : 'rgba(63, 63, 70, 0.5)',
                        stroke: '#ffffff',
                        strokeWidth: 0.2,
                        strokeOpacity: 0.6,
                        outline: 'none',
                        transition: 'fill 0.2s ease-in-out',
                      },
                      hover: {
                        fill: isSelected ? 'rgba(127, 29, 29, 0.8)' : 'rgba(185, 28, 28, 0.7)',
                        stroke: '#ffffff',
                        strokeWidth: 0.3,
                        strokeOpacity: 0.9,
                        outline: 'none',
                        cursor: 'pointer',
                      },
                      pressed: {
                        fill: 'rgba(127, 29, 29, 0.9)',
                        stroke: '#ffffff',
                        strokeWidth: 0.4,
                        strokeOpacity: 1,
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Centered Labels for Neighborhoods */}
          <Geographies geography={geoJsonData}>
            {({ geographies }) =>
              geographies.map((geo: any) => {
                const centroid = geoCentroid(geo);
                const name = geo.properties?.name || 'Unknown';

                // Only show labels when zoomed in enough
                if (zoom < 2) return null;

                // Bigger base size for more readable text
                // At zoom 2x, text is 6px. At zoom 3x, text is 4px
                const baseSize = 6;
                const fontSize = baseSize / zoom;

                return (
                  <Annotation
                    key={`label-${geo.rsmKey || name}`}
                    subject={centroid}
                    dx={0}
                    dy={0}
                  >
                    <text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      style={{
                        fill: '#ffffff',
                        fontSize: `${fontSize}px`,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 500,
                        pointerEvents: 'none',
                        textShadow: '0px 0px 3px rgba(0,0,0,0.8), 0px 1px 2px rgba(0,0,0,0.6)',
                        userSelect: 'none',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {name}
                    </text>
                  </Annotation>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip - only show when not zoomed in too much */}
      {hoveredName && zoom < 2 && (
        <div className="absolute top-4 left-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-700 pointer-events-none z-10">
          <p className="text-sm font-medium">{hoveredName}</p>
        </div>
      )}

      {/* Map controls hint */}
      <div className="absolute bottom-4 right-4 bg-slate-800/90 text-slate-300 px-3 py-2 rounded text-xs">
        Click to select • Scroll to zoom • Drag to pan
      </div>
    </div>
  );
}
