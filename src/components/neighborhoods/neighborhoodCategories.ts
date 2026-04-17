export type NeighborhoodCategory = 'park' | 'commercial' | 'residential';

const PARK_NAMES = new Set<string>([
  'Golden Gate Park',
  'Lincoln Park / Ft. Miley',
  'McLaren Park',
  'Presidio National Park',
]);

const COMMERCIAL_NAMES = new Set<string>([
  'Downtown / Union Square',
  'Financial District',
  'Northern Waterfront',
  'Tenderloin',
  'Civic Center',
  'South of Market',
  'Rincon Hill',
  'Apparel City',
  'Produce Market',
  'Mint Hill',
  'Showplace Square',
  'Treasure Island',
  'Yerba Buena Island',
]);

export const CATEGORY_COLORS = {
  // Muted teal-grey parks – distinctly "natural" vs the sapphire residentials.
  park: '#3d5a5e',
  // Commercial / civic – dark steel, darker than any residential variant.
  commercial: '#1a2233',
  // Residential base – deep sapphire; see getFillColor for hashed variation.
  residentialBase: '#1e3a5f',
  border: 'rgba(255,255,255,0.18)',
  borderSelected: '#ffffff',
  background: '#0b111c',
  labelOnDark: 'rgba(255,255,255,0.92)',
  labelHalo: 'rgba(0,0,0,0.55)',
} as const;

export function getCategory(name: string): NeighborhoodCategory {
  if (PARK_NAMES.has(name)) return 'park';
  if (COMMERCIAL_NAMES.has(name)) return 'commercial';
  return 'residential';
}

function hashString(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const c = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Residential fill – sapphire / indigo band with deterministic variation per
 * neighborhood name. Hue swings a few degrees around a cool-blue center and
 * lightness varies enough to give the map that "data heatmap" feel without
 * requiring real data. All variants sit in the same family so the map reads
 * as cohesive rather than rainbow.
 */
export function getFillColor(name: string, category: NeighborhoodCategory): string {
  if (category === 'park') return CATEGORY_COLORS.park;
  if (category === 'commercial') return CATEGORY_COLORS.commercial;

  const h = hashString(name);
  const hue = 212 + ((h % 9) - 4); // 208–216 (deep sapphire band)
  const sat = 40 + ((h >> 3) % 18); // 40–57
  const light = 22 + ((h >> 7) % 16); // 22–37
  return hslToHex(hue, sat, light);
}

export function lightenHex(hex: string, amount = 0.1): string {
  const n = hex.replace('#', '');
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const lr = Math.min(255, Math.round(r + (255 - r) * amount));
  const lg = Math.min(255, Math.round(g + (255 - g) * amount));
  const lb = Math.min(255, Math.round(b + (255 - b) * amount));
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
}
