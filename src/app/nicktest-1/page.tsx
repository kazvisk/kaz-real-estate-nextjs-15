'use client';

/**
 * Full-page San Francisco Neighborhoods Map
 * 
 * Optimized for iframe embedding - map takes up the full viewport
 * Clicking Outer Richmond redirects to external URL
 */

import React, { useState, useEffect } from 'react';
import MapboxNeighborhoodMap from '@/components/neighborhoods/MapboxNeighborhoodMap';
import { SfNeighborhoodFeature } from '@/components/neighborhoods/types';

export default function NickTest1Page() {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch('/data/SF_Find_Neighborhoods_20251109.geojson')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load neighborhood data');
        }
        return res.json();
      })
      .then((data) => {
        setGeoJsonData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading GeoJSON:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleNeighborhoodSelect = (
    name: string,
    feature: SfNeighborhoodFeature
  ) => {
    // Open Outer Richmond link in new tab
    if (name === 'Outer Richmond') {
      window.open('https://lvslrealestate.com/san-francisco-CA/sea-cliff', '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedName(name);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white">Loading neighborhood data...</p>
        </div>
      </div>
    );
  }

  if (error || !geoJsonData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900">
        <div className="text-center max-w-md p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Unable to Load Map
          </h2>
          <p className="text-slate-300 mb-4">
            {error || 'Neighborhood data could not be loaded.'}
          </p>
          <p className="text-sm text-slate-400">
            Please try refreshing the page or contact support if the issue persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 w-full h-full" 
      style={{ 
        margin: 0, 
        padding: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <MapboxNeighborhoodMap
        geoJsonData={geoJsonData}
        onSelect={handleNeighborhoodSelect}
        selectedName={selectedName}
      />
    </div>
  );
}

