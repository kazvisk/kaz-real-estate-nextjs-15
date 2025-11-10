'use client';

/**
 * Mapbox-based Interactive San Francisco Neighborhood Map Component
 *
 * This component renders neighborhoods on top of a Mapbox base map.
 * Features:
 * - Real streets and geographic context via Mapbox
 * - Click to select a neighborhood
 * - Hover effects for better UX
 * - Visual highlight for selected neighborhood
 * - Zoom controls and search functionality
 * - Optimized for both desktop and mobile views
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Map, Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import type { MapRef, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import type { FillLayer, LineLayer } from 'maplibre-gl';
import { SfNeighborhoodFeature } from './types';
import {
  NEIGHBORHOOD_DISTRICT,
  DISTRICT_COLORS,
  DISTRICT_COLORS_HOVER,
  DISTRICT_COLORS_SELECTED,
  getDistrict
} from './districtMapping';

interface MapboxNeighborhoodMapProps {
  /** GeoJSON data for SF neighborhoods */
  geoJsonData: any;
  /** Callback when a neighborhood is selected */
  onSelect: (name: string, feature: SfNeighborhoodFeature) => void;
  /** Currently selected neighborhood name */
  selectedName?: string | null;
}

// Using MapLibre with free vector tiles from MapTiler
// No API key needed for basic usage with MapLibre

export default function MapboxNeighborhoodMap({
  geoJsonData,
  onSelect,
  selectedName,
}: MapboxNeighborhoodMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

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

  // Handle map click
  const handleMapClick = (event: MapLayerMouseEvent) => {
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];
      const name = feature.properties?.name;
      if (name) {
        onSelect(name, feature as any);
      }
    }
  };

  // Handle hover with mousemove for better responsiveness
  const handleMouseMove = (event: MapLayerMouseEvent) => {
    const features = event.features;
    if (features && features.length > 0) {
      const name = features[0].properties?.name;
      if (name && name !== hoveredName) {
        setHoveredName(name);
        if (mapRef.current) {
          mapRef.current.getMap().getCanvas().style.cursor = 'pointer';
        }
      }
    } else if (hoveredName) {
      setHoveredName(null);
      if (mapRef.current) {
        mapRef.current.getMap().getCanvas().style.cursor = '';
      }
    }
  };

  // Build district color expression for MapLibre
  // Creates a color lookup based on neighborhood name -> district -> color
  const buildFillColorExpression = (): any => {
    const expression: any[] = ['case'];

    // For each neighborhood, check if it's selected or hovered, then assign appropriate district color
    Object.entries(NEIGHBORHOOD_DISTRICT).forEach(([neighborhood, district]) => {
      const baseColor = DISTRICT_COLORS[district] || 'rgba(100, 116, 139, 0.3)';
      const hoverColor = DISTRICT_COLORS_HOVER[district] || 'rgba(100, 116, 139, 0.5)';
      const selectedColor = DISTRICT_COLORS_SELECTED[district] || 'rgba(100, 116, 139, 0.7)';

      // Check if this neighborhood is selected
      if (selectedName && neighborhood === selectedName) {
        expression.push(['==', ['get', 'name'], neighborhood]);
        expression.push(selectedColor);
      }
      // Check if this neighborhood is hovered
      else if (hoveredName && neighborhood === hoveredName) {
        expression.push(['==', ['get', 'name'], neighborhood]);
        expression.push(hoverColor);
      }
      // Default state
      else {
        expression.push(['==', ['get', 'name'], neighborhood]);
        expression.push(baseColor);
      }
    });

    // Fallback color for unmapped neighborhoods
    expression.push('rgba(100, 116, 139, 0.3)');
    return expression;
  };

  // Layer styles with district-based coloring
  const fillLayer: FillLayer = {
    id: 'neighborhoods-fill',
    type: 'fill',
    paint: {
      'fill-color': buildFillColorExpression(),
      'fill-opacity': 1,
    },
  };

  const lineLayer: LineLayer = {
    id: 'neighborhoods-line',
    type: 'line',
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'case',
        ['==', ['get', 'name'], selectedName || ''],
        2,
        ['==', ['get', 'name'], hoveredName || ''],
        1.5,
        0.8
      ],
      'line-opacity': 0.9,
    },
  };

  return (
    <div className="w-full h-full min-h-[500px] relative overflow-hidden">
      <style>{`
        .maplibregl-canvas-container canvas {
          filter: saturate(0.9);
        }
        /* Hide city/place labels from the base map */
        .maplibregl-ctrl-attrib,
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
      `}</style>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -122.435,
          latitude: 37.76,
          zoom: 11.5,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json"
        interactiveLayerIds={['neighborhoods-fill']}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        attributionControl={false}
      >
        {/* Navigation controls (zoom buttons) */}
        <NavigationControl position="top-right" />

        {/* Neighborhood boundaries */}
        <Source id="neighborhoods" type="geojson" data={geoJsonData}>
          <Layer {...fillLayer} />
          <Layer {...lineLayer} />
        </Source>
      </Map>

      {/* Search Toggle Button */}
      <div className="absolute top-4 right-16 z-10">
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
        <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 w-64">
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

      {/* Hover tooltip */}
      {hoveredName && (
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
