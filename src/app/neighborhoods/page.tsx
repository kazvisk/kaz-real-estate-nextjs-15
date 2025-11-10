'use client';

/**
 * San Francisco Neighborhoods Explorer Page
 *
 * An interactive map showing SF neighborhoods with detailed market statistics.
 * Users can click on neighborhoods to view pricing data, walk scores, and more.
 */

import React, { useState, useEffect } from 'react';
import MapboxNeighborhoodMap from '@/components/neighborhoods/MapboxNeighborhoodMap';
import NeighborhoodDetailPanel from '@/components/neighborhoods/NeighborhoodDetailPanel';
import { SfNeighborhoodFeature } from '@/components/neighborhoods/types';
import { getNeighborhoodStats } from '@/components/neighborhoods/neighborhoodStats';

export default function NeighborhoodsPage() {
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
    setSelectedName(name);
  };

  const stats = selectedName ? getNeighborhoodStats(selectedName) : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mb-4"></div>
          <p className="text-slate-600">Loading neighborhood data...</p>
        </div>
      </div>
    );
  }

  if (error || !geoJsonData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Unable to Load Map
          </h2>
          <p className="text-slate-600 mb-4">
            {error || 'Neighborhood data could not be loaded.'}
          </p>
          <p className="text-sm text-slate-500">
            Please try refreshing the page or contact support if the issue persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            San Francisco Neighborhoods
          </h1>
          <p className="text-lg text-slate-600">
            Explore neighborhoods across the city. Click any area to view detailed
            market insights.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[70vh]">
            {/* Map Section */}
            <div className="md:w-3/5 w-full">
              <MapboxNeighborhoodMap
                geoJsonData={geoJsonData}
                onSelect={handleNeighborhoodSelect}
                selectedName={selectedName}
              />
            </div>

            {/* Info Panel Section */}
            <div className="md:w-2/5 w-full border-t md:border-t-0 md:border-l border-slate-200">
              <NeighborhoodDetailPanel
                selectedName={selectedName}
                stats={stats}
              />
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            How to Use This Map
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="text-red-800 font-bold mr-2">•</span>
              <span>
                <strong>Click</strong> on any neighborhood to view detailed market
                statistics
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-800 font-bold mr-2">•</span>
              <span>
                <strong>Scroll</strong> to zoom in and out of the map
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-800 font-bold mr-2">•</span>
              <span>
                <strong>Drag</strong> to pan around San Francisco
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-800 font-bold mr-2">•</span>
              <span>
                Statistics shown are representative market data. Contact us for
                current listings and personalized neighborhood analysis.
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
