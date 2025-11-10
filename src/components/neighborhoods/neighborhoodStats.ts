/**
 * Neighborhood statistics for San Francisco neighborhoods
 *
 * These are placeholder values. In production, this would connect to live MLS data.
 */

import { NeighborhoodStats } from './types';

export const NEIGHBORHOOD_STATS: Record<string, NeighborhoodStats> = {
  "Inner Richmond": {
    medianHousePrice: 2020000,
    medianCondoPrice: 1458000,
    housePricePerSqft: 1033.25,
    condoPricePerSqft: 903.07,
    walkScore: 90,
    transitScore: 68,
    description: "Known for its diverse dining scene, proximity to Golden Gate Park, and foggy coastal charm. A favorite for families and young professionals seeking a quieter SF lifestyle with excellent transit access."
  },
  "Outer Richmond": {
    medianHousePrice: 1850000,
    medianCondoPrice: 1285000,
    housePricePerSqft: 975.50,
    condoPricePerSqft: 850.25,
    walkScore: 85,
    transitScore: 62,
    description: "Offering stunning ocean views and a more residential feel, the Outer Richmond is perfect for those who love parks, beaches, and a strong sense of community. Land's End and Ocean Beach are major draws."
  },
  "Presidio Heights": {
    medianHousePrice: 4500000,
    medianCondoPrice: 2850000,
    housePricePerSqft: 1425.00,
    condoPricePerSqft: 1180.50,
    walkScore: 88,
    transitScore: 70,
    description: "One of SF's most prestigious neighborhoods, featuring tree-lined streets, elegant architecture, and proximity to the Presidio. Popular with established professionals and families."
  },
  "Marina": {
    medianHousePrice: 3200000,
    medianCondoPrice: 1950000,
    housePricePerSqft: 1350.75,
    condoPricePerSqft: 1125.00,
    walkScore: 92,
    transitScore: 75,
    description: "Vibrant waterfront neighborhood with stunning bay views, excellent restaurants, and nightlife. Popular with young professionals and known for its active, social atmosphere."
  },
  "Nob Hill": {
    medianHousePrice: 2800000,
    medianCondoPrice: 1650000,
    housePricePerSqft: 1250.00,
    condoPricePerSqft: 1050.00,
    walkScore: 98,
    transitScore: 95,
    description: "Historic hilltop neighborhood home to luxury hotels, fine dining, and cable cars. Centrally located with spectacular city views and world-class amenities."
  },
  "Haight Ashbury": {
    medianHousePrice: 2100000,
    medianCondoPrice: 1400000,
    housePricePerSqft: 1100.00,
    condoPricePerSqft: 925.00,
    walkScore: 94,
    transitScore: 82,
    description: "Famous for its counterculture history, Victorian architecture, and eclectic shopping. Adjacent to Golden Gate Park with a bohemian vibe and diverse community."
  },
  "Mission": {
    medianHousePrice: 2250000,
    medianCondoPrice: 1350000,
    housePricePerSqft: 1150.00,
    condoPricePerSqft: 950.00,
    walkScore: 96,
    transitScore: 88,
    description: "SF's sunniest neighborhood, renowned for its vibrant Latino culture, street art, innovative restaurants, and nightlife. A cultural hub with excellent transit connectivity."
  },
  "Noe Valley": {
    medianHousePrice: 2650000,
    medianCondoPrice: 1750000,
    housePricePerSqft: 1300.00,
    condoPricePerSqft: 1100.00,
    walkScore: 91,
    transitScore: 72,
    description: "Family-friendly neighborhood with a village feel, excellent schools, boutique shopping on 24th Street, and sunny microclimates. Popular with young families."
  },
  "Pacific Heights": {
    medianHousePrice: 5200000,
    medianCondoPrice: 2950000,
    housePricePerSqft: 1550.00,
    condoPricePerSqft: 1250.00,
    walkScore: 93,
    transitScore: 78,
    description: "SF's most exclusive neighborhood, featuring grand Victorian and Edwardian mansions, spectacular bay views, and high-end shopping on Fillmore Street."
  },
  "North Beach": {
    medianHousePrice: 2400000,
    medianCondoPrice: 1500000,
    housePricePerSqft: 1200.00,
    condoPricePerSqft: 1000.00,
    walkScore: 97,
    transitScore: 90,
    description: "San Francisco's Little Italy, famous for its Italian heritage, cafes, restaurants, and vibrant street life. Home to City Lights Bookstore and the Beat Generation legacy."
  }
};

// Fallback stats for neighborhoods not in the detailed list
export const DEFAULT_STATS: NeighborhoodStats = {
  medianHousePrice: 1800000,
  medianCondoPrice: 1200000,
  housePricePerSqft: 950.00,
  condoPricePerSqft: 800.00,
  walkScore: 85,
  transitScore: 70,
  description: "This neighborhood is a favorite among SF residents for its balance of parks, local shops, and access to transit. When we plug in live MLS data, this panel will update automatically with current market statistics."
};

export function getNeighborhoodStats(name: string): NeighborhoodStats {
  return NEIGHBORHOOD_STATS[name] || DEFAULT_STATS;
}
