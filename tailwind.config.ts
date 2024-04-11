import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'true-black-700': '#0E0E0E',
        'true-gray-700': '#8D969F',
        'true-gray-300': '#6F6F6F',
        'true-white-100': '#F3F3F3',
        'true-black-800': '#141414',
        'true-black-900': '#070707',
        'true-gray-400': '#3D3D45',
        'true-purple-100': '#2A215B',
      },
    },
  },
  plugins: [],
};
export default config;
