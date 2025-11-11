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
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [mapViewState, setMapViewState] = useState(0); // Trigger for label repositioning

  // Get all neighborhood names for search
  const allNeighborhoods = useMemo(() => {
    if (!geoJsonData?.features) return [];
    return geoJsonData.features.map((f: any) => f.properties?.name || 'Unknown');
  }, [geoJsonData]);

  // Aggregate neighborhoods into districts
  const districtGeoJson = useMemo(() => {
    if (!geoJsonData?.features) return null;

    const districtFeatures: any = {};

    geoJsonData.features.forEach((feature: any) => {
      const neighborhoodName = feature.properties?.name;
      const district = getDistrict(neighborhoodName);

      if (district) {
        if (!districtFeatures[district]) {
          districtFeatures[district] = {
            type: 'Feature',
            properties: { district, neighborhoods: [] },
            geometry: { type: 'MultiPolygon', coordinates: [] }
          };
        }

        districtFeatures[district].properties.neighborhoods.push(neighborhoodName);

        // Add this neighborhood's geometry to the district
        if (feature.geometry.type === 'Polygon') {
          districtFeatures[district].geometry.coordinates.push(feature.geometry.coordinates);
        } else if (feature.geometry.type === 'MultiPolygon') {
          districtFeatures[district].geometry.coordinates.push(...feature.geometry.coordinates);
        }
      }
    });

    return {
      type: 'FeatureCollection',
      features: Object.values(districtFeatures)
    };
  }, [geoJsonData]);

  // Calculate district centroids for labels
  const districtCentroids = useMemo(() => {
    if (!districtGeoJson) return {};

    const centroids: Record<string, [number, number]> = {};

    districtGeoJson.features.forEach((feature: any) => {
      const district = feature.properties.district;
      const coords = feature.geometry.coordinates;

      // Simple centroid calculation - average all polygon points
      let totalLon = 0, totalLat = 0, count = 0;

      coords.forEach((polygon: any) => {
        polygon.forEach((ring: any) => {
          ring.forEach((point: any) => {
            totalLon += point[0];
            totalLat += point[1];
            count++;
          });
        });
      });

      if (count > 0) {
        centroids[district] = [totalLon / count, totalLat / count];
      }
    });

    return centroids;
  }, [districtGeoJson]);

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
      const district = getDistrict(name);
      setSelectedDistrict(district);
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

      // Check if clicking on a district (when no district is selected)
      if (!selectedDistrict && feature.properties?.district) {
        const district = feature.properties.district;
        setSelectedDistrict(district);
        return;
      }

      // Check if clicking on a neighborhood (when district is selected)
      if (selectedDistrict && feature.properties?.name) {
        const name = feature.properties.name;
        onSelect(name, feature as any);
      }
    }
  };

  // Handle hover with mousemove for better responsiveness
  const handleMouseMove = (event: MapLayerMouseEvent) => {
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];

      // If no district selected, hover over districts
      if (!selectedDistrict && feature.properties?.district) {
        const district = feature.properties.district;
        if (district !== hoveredDistrict) {
          setHoveredDistrict(district);
          setHoveredName(null);
          if (mapRef.current) {
            mapRef.current.getMap().getCanvas().style.cursor = 'pointer';
          }
        }
      }
      // If district selected, hover over neighborhoods
      else if (selectedDistrict && feature.properties?.name) {
        const name = feature.properties.name;
        if (name !== hoveredName) {
          setHoveredName(name);
          setHoveredDistrict(null);
          if (mapRef.current) {
            mapRef.current.getMap().getCanvas().style.cursor = 'pointer';
          }
        }
      }
    } else {
      if (hoveredName || hoveredDistrict) {
        setHoveredName(null);
        setHoveredDistrict(null);
        if (mapRef.current) {
          mapRef.current.getMap().getCanvas().style.cursor = '';
        }
      }
    }
  };

  // Build district fill color expression
  const buildDistrictFillColorExpression = (): any => {
    const expression: any[] = ['case'];

    Object.keys(DISTRICT_COLORS).forEach((district) => {
      const baseColor = DISTRICT_COLORS[district];
      const hoverColor = DISTRICT_COLORS_HOVER[district];

      if (hoveredDistrict && district === hoveredDistrict) {
        expression.push(['==', ['get', 'district'], district]);
        expression.push(hoverColor);
      } else {
        expression.push(['==', ['get', 'district'], district]);
        expression.push(baseColor);
      }
    });

    expression.push('rgba(100, 116, 139, 0.3)');
    return expression;
  };

  // Build neighborhood fill color expression (only for selected district)
  const buildNeighborhoodFillColorExpression = (): any => {
    const expression: any[] = ['case'];

    Object.entries(NEIGHBORHOOD_DISTRICT).forEach(([neighborhood, district]) => {
      // Only show neighborhoods from the selected district
      if (selectedDistrict && district === selectedDistrict) {
        const baseColor = DISTRICT_COLORS[district] || 'rgba(100, 116, 139, 0.3)';
        const hoverColor = DISTRICT_COLORS_HOVER[district] || 'rgba(100, 116, 139, 0.5)';
        const selectedColor = DISTRICT_COLORS_SELECTED[district] || 'rgba(100, 116, 139, 0.7)';

        if (selectedName && neighborhood === selectedName) {
          expression.push(['==', ['get', 'name'], neighborhood]);
          expression.push(selectedColor);
        } else if (hoveredName && neighborhood === hoveredName) {
          expression.push(['==', ['get', 'name'], neighborhood]);
          expression.push(hoverColor);
        } else {
          expression.push(['==', ['get', 'name'], neighborhood]);
          expression.push(baseColor);
        }
      }
    });

    expression.push('rgba(0, 0, 0, 0)'); // Transparent for non-selected districts
    return expression;
  };

  // District layer styles
  const districtFillLayer = {
    id: 'districts-fill',
    type: 'fill' as const,
    paint: {
      'fill-color': buildDistrictFillColorExpression(),
      'fill-opacity': 1,
    },
  };

  const districtLineLayer = {
    id: 'districts-line',
    type: 'line' as const,
    paint: {
      'line-color': '#ffffff',
      'line-width': 0.8,
      'line-opacity': 0.8,
    },
  };

  // Neighborhood layer styles (only visible when district selected)
  const neighborhoodFillLayer = {
    id: 'neighborhoods-fill',
    type: 'fill' as const,
    paint: {
      'fill-color': buildNeighborhoodFillColorExpression(),
      'fill-opacity': selectedDistrict ? 1 : 0,
    },
  };

  const neighborhoodLineLayer = {
    id: 'neighborhoods-line',
    type: 'line' as const,
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'case',
        ['==', ['get', 'name'], selectedName || ''],
        1.2,
        ['==', ['get', 'name'], hoveredName || ''],
        0.8,
        0.4
      ],
      'line-opacity': selectedDistrict ? 0.6 : 0,
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
        interactiveLayerIds={selectedDistrict ? ['neighborhoods-fill'] : ['districts-fill']}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMove={() => setMapViewState(prev => prev + 1)}
        attributionControl={false}
      >
        {/* Navigation controls (zoom buttons) */}
        <NavigationControl position="top-right" />

        {/* District boundaries (shown when no district selected) */}
        {!selectedDistrict && districtGeoJson && (
          <Source id="districts" type="geojson" data={districtGeoJson}>
            <Layer {...(districtFillLayer as any)} />
            <Layer {...(districtLineLayer as any)} />
          </Source>
        )}

        {/* Neighborhood boundaries (always present, but only visible when district selected) */}
        <Source id="neighborhoods" type="geojson" data={geoJsonData}>
          <Layer {...(neighborhoodFillLayer as any)} />
          <Layer {...(neighborhoodLineLayer as any)} />
        </Source>

        {/* District labels (shown when no district selected) */}
        {!selectedDistrict && Object.entries(districtCentroids).map(([district, coords]) => {
          const map = mapRef.current?.getMap();
          if (!map) return null;

          const point = map.project(coords as [number, number]);
          const districtNumber = district.split(' ').pop(); // Extract number from "San Francisco Realtor 1"

          return (
            <div
              key={district}
              style={{
                position: 'absolute',
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
              className="text-white font-bold text-lg drop-shadow-lg"
            >
              District {districtNumber}
            </div>
          );
        })}
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

      {/* Back to Districts button (shown when district is selected) */}
      {selectedDistrict && (
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => {
              setSelectedDistrict(null);
              onSelect('', null as any); // Clear neighborhood selection
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 py-2 rounded shadow-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Districts
          </button>
        </div>
      )}

      {/* Hover tooltip */}
      {hoveredDistrict && !selectedDistrict && (
        <div className="absolute top-4 left-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-700 pointer-events-none z-10">
          <p className="text-sm font-medium">{hoveredDistrict.replace('San Francisco Realtor ', 'District ')}</p>
          <p className="text-xs text-slate-300 mt-1">Click to view neighborhoods</p>
        </div>
      )}
      {hoveredName && selectedDistrict && (
        <div className="absolute top-4 left-20 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-700 pointer-events-none z-10">
          <p className="text-sm font-medium">{hoveredName}</p>
        </div>
      )}

      {/* Map controls hint */}
      <div className="absolute bottom-4 right-4 bg-slate-800/90 text-slate-300 px-3 py-2 rounded text-xs">
        {selectedDistrict ? 'Click neighborhood for details' : 'Click district to explore'} • Scroll to zoom • Drag to pan
      </div>
    </div>
  );
}
