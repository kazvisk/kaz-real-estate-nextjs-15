/**
 * TypeScript types for SF Neighborhoods map
 */

import { Geometry } from 'geojson';

export interface SfNeighborhoodProperties {
  name: string;
  link?: string;
  [key: string]: any;
}

export interface SfNeighborhoodFeature {
  type: 'Feature';
  geometry: Geometry;
  properties: SfNeighborhoodProperties;
}

export interface NeighborhoodStats {
  medianHousePrice: number;
  medianCondoPrice: number;
  housePricePerSqft: number;
  condoPricePerSqft: number;
  walkScore: number;
  transitScore: number;
  description?: string;
}
