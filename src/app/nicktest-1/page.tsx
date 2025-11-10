'use client';

/**
 * Full-page San Francisco Neighborhoods Map
 * 
 * Optimized for iframe embedding - map takes up the full viewport
 * Clicking neighborhoods opens their corresponding LVSL Real Estate pages in new tabs
 */

import React, { useState, useEffect } from 'react';
import MapboxNeighborhoodMap from '@/components/neighborhoods/MapboxNeighborhoodMap';
import { SfNeighborhoodFeature } from '@/components/neighborhoods/types';

// Neighborhood to URL mapping
const NEIGHBORHOOD_URLS: Record<string, string> = {
  'Seacliff': 'https://lvslrealestate.com/san-francisco-CA/sea-cliff',
  'Sea Cliff': 'https://lvslrealestate.com/san-francisco-CA/sea-cliff',
  'Lake Street': 'https://lvslrealestate.com/san-francisco-CA/lake-street',
  'Presidio National Park': 'https://lvslrealestate.com/san-francisco-CA/presidio-national-park',
  'Presidio Terrace': 'https://lvslrealestate.com/san-francisco-CA/presidio-terrace',
  'Inner Richmond': 'https://lvslrealestate.com/san-francisco-CA/inner-richmond',
  'Sutro Heights': 'https://lvslrealestate.com/san-francisco-CA/sutro-heights',
  'Lincoln Park / Ft. Miley': 'https://lvslrealestate.com/san-francisco-CA/lincoln-park-ft-miley',
  'Lincoln Park': 'https://lvslrealestate.com/san-francisco-CA/lincoln-park-ft-miley',
  'Outer Richmond': 'https://lvslrealestate.com/san-francisco-CA/outer-richmond',
  'Golden Gate Park': 'https://lvslrealestate.com/san-francisco-CA/golden-gate-park',
  'Presidio Heights': 'https://lvslrealestate.com/san-francisco-CA/presidio-heights',
  'Laurel Heights / Jordan Park': 'https://lvslrealestate.com/san-francisco-CA/laurel-heights-jordan-park',
  'Laurel Heights': 'https://lvslrealestate.com/san-francisco-CA/laurel-heights-jordan-park',
  'Jordan Park': 'https://lvslrealestate.com/san-francisco-CA/laurel-heights-jordan-park',
  'Lone Mountain': 'https://lvslrealestate.com/san-francisco-CA/lone-mountain',
  'Anza Vista': 'https://lvslrealestate.com/san-francisco-CA/anza-vista',
  'Cow Hollow': 'https://lvslrealestate.com/san-francisco-CA/cow-hollow',
  'Union Street': 'https://lvslrealestate.com/san-francisco-CA/union-street',
  'Nob Hill': 'https://lvslrealestate.com/san-francisco-CA/nob-hill',
  'Marina': 'https://lvslrealestate.com/san-francisco-CA/marina',
  'Marina District': 'https://lvslrealestate.com/san-francisco-CA/marina',
  'Telegraph Hill': 'https://lvslrealestate.com/san-francisco-CA/telegraph-hill',
  'Downtown / Union Square': 'https://lvslrealestate.com/san-francisco-CA/downtown-union-square',
  'Downtown': 'https://lvslrealestate.com/san-francisco-CA/downtown-union-square',
  'Union Square': 'https://lvslrealestate.com/san-francisco-CA/downtown-union-square',
  'Tenderloin': 'https://lvslrealestate.com/san-francisco-CA/tenderloin',
  'Civic Center': 'https://lvslrealestate.com/san-francisco-CA/civic-center',
  'Hayes Valley': 'https://lvslrealestate.com/san-francisco-CA/hayes-valley',
  'Alamo Square': 'https://lvslrealestate.com/san-francisco-CA/alamo-square',
  'Panhandle': 'https://lvslrealestate.com/san-francisco-CA/panhandle',
  'Haight Ashbury': 'https://lvslrealestate.com/san-francisco-CA/haight-ashbury',
  'Lower Haight': 'https://lvslrealestate.com/san-francisco-CA/lower-haight',
  'Mint Hill': 'https://lvslrealestate.com/san-francisco-CA/mint-hill',
  'Duboce Triangle': 'https://lvslrealestate.com/san-francisco-CA/duboce-triangle',
  'Cole Valley': 'https://lvslrealestate.com/san-francisco-CA/cole-valley',
  'Rincon Hill': 'https://lvslrealestate.com/san-francisco-CA/rincon-hill',
  'South Beach': 'https://lvslrealestate.com/san-francisco-CA/south-beach',
  'South of Market': 'https://lvslrealestate.com/san-francisco-CA/south-of-market',
  'SoMa': 'https://lvslrealestate.com/san-francisco-CA/south-of-market',
  'Showplace Square': 'https://lvslrealestate.com/san-francisco-CA/showplace-square',
  'Mission Bay': 'https://lvslrealestate.com/san-francisco-CA/mission-bay',
  'Yerba Buena Island': 'https://lvslrealestate.com/san-francisco-CA/yerba-buena-island',
  'Treasure Island': 'https://lvslrealestate.com/san-francisco-CA/treasure-island',
  'Mission Dolores': 'https://lvslrealestate.com/san-francisco-CA/mission-dolores',
  'Castro': 'https://lvslrealestate.com/san-francisco-CA/castro',
  'Outer Sunset': 'https://lvslrealestate.com/san-francisco-CA/outer-sunset',
  'Parkside': 'https://lvslrealestate.com/san-francisco-CA/parkside',
  'Stonestown': 'https://lvslrealestate.com/san-francisco-CA/stonestown',
  'Parkmerced': 'https://lvslrealestate.com/san-francisco-CA/parkmerced',
  'Lakeshore': 'https://lvslrealestate.com/san-francisco-CA/lakeshore',
  'Golden Gate Heights': 'https://lvslrealestate.com/san-francisco-CA/golden-gate-heights',
  'Forest Hill': 'https://lvslrealestate.com/san-francisco-CA/forest-hill',
  'West Portal': 'https://lvslrealestate.com/san-francisco-CA/west-portal',
  'Clarendon Heights': 'https://lvslrealestate.com/san-francisco-CA/clarendon-heights',
  'Midtown Terrace': 'https://lvslrealestate.com/san-francisco-CA/midtown-terrace',
  'Laguna Honda': 'https://lvslrealestate.com/san-francisco-CA/laguna-honda',
  'Lower Nob Hill': 'https://lvslrealestate.com/san-francisco-CA/lower-nob-hill',
  'Upper Market': 'https://lvslrealestate.com/san-francisco-CA/upper-market',
  'Dolores Heights': 'https://lvslrealestate.com/san-francisco-CA/dolores-heights',
  'Mission': 'https://lvslrealestate.com/san-francisco-CA/mission',
  'Mission District': 'https://lvslrealestate.com/san-francisco-CA/mission',
  'Potrero Hill': 'https://lvslrealestate.com/san-francisco-CA/potrero-hill',
  'Dogpatch': 'https://lvslrealestate.com/san-francisco-CA/dogpatch',
  'Central Waterfront': 'https://lvslrealestate.com/san-francisco-CA/central-waterfront',
  'Diamond Heights': 'https://lvslrealestate.com/san-francisco-CA/diamond-heights',
  'Crocker Amazon': 'https://lvslrealestate.com/san-francisco-CA/crocker-amazon',
  'Fairmount': 'https://lvslrealestate.com/san-francisco-CA/fairmount',
  'Peralta Heights': 'https://lvslrealestate.com/san-francisco-CA/peralta-heights',
  'Holly Park': 'https://lvslrealestate.com/san-francisco-CA/holly-park',
  'Merced Manor': 'https://lvslrealestate.com/san-francisco-CA/merced-manor',
  'Balboa Terrace': 'https://lvslrealestate.com/san-francisco-CA/balboa-terrace',
  'Ingleside': 'https://lvslrealestate.com/san-francisco-CA/ingleside',
  'Merced Heights': 'https://lvslrealestate.com/san-francisco-CA/merced-heights',
  'Outer Mission': 'https://lvslrealestate.com/san-francisco-CA/outer-mission',
  'Ingleside Terraces': 'https://lvslrealestate.com/san-francisco-CA/ingleside-terraces',
  'Mt. Davidson Manor': 'https://lvslrealestate.com/san-francisco-CA/mt-davidson-manor',
  'Mount Davidson Manor': 'https://lvslrealestate.com/san-francisco-CA/mt-davidson-manor',
  'Monterey Heights': 'https://lvslrealestate.com/san-francisco-CA/monterey-heights',
  'Westwood Highlands': 'https://lvslrealestate.com/san-francisco-CA/westwood-highlands',
  'Westwood Park': 'https://lvslrealestate.com/san-francisco-CA/westwood-park',
  'Miraloma Park': 'https://lvslrealestate.com/san-francisco-CA/miraloma-park',
  'McLaren Park': 'https://lvslrealestate.com/san-francisco-CA/mclaren-park',
  'Sunnydale': 'https://lvslrealestate.com/san-francisco-CA/sunnydale',
  'Visitacion Valley': 'https://lvslrealestate.com/san-francisco-CA/visitacion-valley',
  'India Basin': 'https://lvslrealestate.com/san-francisco-CA/india-basin',
  'Northern Waterfront': 'https://lvslrealestate.com/san-francisco-CA/northern-waterfront',
  'North Waterfront': 'https://lvslrealestate.com/san-francisco-CA/northern-waterfront',
  'Hunters Point': 'https://lvslrealestate.com/san-francisco-CA/hunters-point',
  'Candlestick Point SRA': 'https://lvslrealestate.com/san-francisco-CA/candlestick-point-sra',
  'Cayuga': 'https://lvslrealestate.com/san-francisco-CA/cayuga',
  'Oceanview': 'https://lvslrealestate.com/san-francisco-CA/oceanview',
  'Apparel City': 'https://lvslrealestate.com/san-francisco-CA/apparel-city',
  'Bernal Heights': 'https://lvslrealestate.com/san-francisco-CA/bernal-heights',
  'Noe Valley': 'https://lvslrealestate.com/san-francisco-CA/noe-valley',
  'Produce Market': 'https://lvslrealestate.com/san-francisco-CA/produce-market',
  'Bayview': 'https://lvslrealestate.com/san-francisco-CA/bayview',
  'Silver Terrace': 'https://lvslrealestate.com/san-francisco-CA/silver-terrace',
  'Bret Harte': 'https://lvslrealestate.com/san-francisco-CA/bret-harte',
  'Little Hollywood': 'https://lvslrealestate.com/san-francisco-CA/little-hollywood',
  'Excelsior': 'https://lvslrealestate.com/san-francisco-CA/excelsior',
  'Portola': 'https://lvslrealestate.com/san-francisco-CA/portola',
  'University Mound': 'https://lvslrealestate.com/san-francisco-CA/university-mound',
  'St. Marys Park': 'https://lvslrealestate.com/san-francisco-CA/st-marys-park',
  'Mission Terrace': 'https://lvslrealestate.com/san-francisco-CA/mission-terrace',
  'Sunnyside': 'https://lvslrealestate.com/san-francisco-CA/sunnyside',
  'Glen Park': 'https://lvslrealestate.com/san-francisco-CA/glen-park',
  'Western Addition': 'https://lvslrealestate.com/san-francisco-CA/western-addition',
  'Aquatic Park / Ft. Mason': 'https://lvslrealestate.com/san-francisco-CA/aquatic-park-ft-mason',
  'Aquatic Park': 'https://lvslrealestate.com/san-francisco-CA/aquatic-park-ft-mason',
  'Fishermans Wharf': 'https://lvslrealestate.com/san-francisco-CA/fishermans-wharf',
  'Cathedral Hill': 'https://lvslrealestate.com/san-francisco-CA/cathedral-hill',
  'Japantown': 'https://lvslrealestate.com/san-francisco-CA/japantown',
  'Pacific Heights': 'https://lvslrealestate.com/san-francisco-CA/pacific-heights',
  'Lower Pacific Heights': 'https://lvslrealestate.com/san-francisco-CA/lower-pacific-heights',
  'Chinatown': 'https://lvslrealestate.com/san-francisco-CA/chinatown',
  'Polk Gulch': 'https://lvslrealestate.com/san-francisco-CA/polk-gulch',
  'North Beach': 'https://lvslrealestate.com/san-francisco-CA/north-beach',
  'Russian Hill': 'https://lvslrealestate.com/san-francisco-CA/russian-hill',
  'Financial District': 'https://lvslrealestate.com/san-francisco-CA/financial-district',
  'Inner Sunset': 'https://lvslrealestate.com/san-francisco-CA/inner-sunset',
  'Parnassus Heights': 'https://lvslrealestate.com/san-francisco-CA/parnassus-heights',
  'Forest Knolls': 'https://lvslrealestate.com/san-francisco-CA/forest-knolls',
  'Buena Vista': 'https://lvslrealestate.com/san-francisco-CA/buena-vista',
  'Corona Heights': 'https://lvslrealestate.com/san-francisco-CA/corona-heights',
  'Ashbury Heights': 'https://lvslrealestate.com/san-francisco-CA/ashbury-heights',
  'Eureka Valley': 'https://lvslrealestate.com/san-francisco-CA/eureka-valley',
  'St. Francis Wood': 'https://lvslrealestate.com/san-francisco-CA/st-francis-wood',
  'Saint Francis Wood': 'https://lvslrealestate.com/san-francisco-CA/st-francis-wood',
  'Sherwood Forest': 'https://lvslrealestate.com/san-francisco-CA/sherwood-forest',
};

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
    // Check if neighborhood has a mapped URL
    const url = NEIGHBORHOOD_URLS[name];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    // If no URL mapping, show neighborhood details as before
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

