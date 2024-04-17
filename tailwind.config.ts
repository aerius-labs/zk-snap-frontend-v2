import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      light: '#F3F3F3',
      subText: '#6F6F6F',
      dark: '#070707',
      lightDark: '#141414',
      dividers: '#3D3D45',
      gray: {
        0: '#29292900',
        100: '#292929',
        200: '#DEDEDE',
      },
      green: {
        600: '#16a34a',
      },
      black: {
        700: '#0E0E0E',
      },
      purple: {
        0: '#29292900',
        100: '#281E5B',
        200: '#2A215B',
        300: '#3E2D98',
      },
      inactive: '#8D969F',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        lg: '0px 0px 12.1px 0px #49EEFA40',
      },
    },
  },
  plugins: [],
};
export default config;
