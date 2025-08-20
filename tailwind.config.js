/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        'tight-luxury': '-0.05em',
        'normal-luxury': '-0.02em',
      },
      lineHeight: {
        'luxury': '1.1',
        'comfortable': '1.4',
      },
    },
  },
  plugins: [],
}

