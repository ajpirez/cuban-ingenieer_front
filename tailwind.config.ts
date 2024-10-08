import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        acceptButton: '#0D55CF',
        cancelButton: '#EAF0F5',
        greenLetter: '#52c19d',
        greenLetterLight: '#adf0d9',
        greenLetterDark: '#18af7d',
        purpleLetter: '#9565ec',
        purpleLetterLight: '#dbc7ff',
        purpleLetterDark: '#7b3ee8',
        orangeLetter: '#f7ab4a',
        orangeLetterLight: '#ffe6c7',
        orangeLetterDark: '#f58e0a',
        blueLetter: '#1a8bff',
        blueLetterLight: '#d6ebff',
        blueLetterDark: '#0983ff',
        textLetterDark: '#4d596e',
        textLetterDarkEnabled: '#9aa3b2',
        textLetterLight: '#8e96a2',
        textLetterLightDisabled: '#d0d6db',
        textDisabled: '#c3c9d2',
        textEnabled: '#a0a8b7',
        navbarColor: '#333',
      },
      screens: {
        'custom-xl': '1230px',
      },
    },
  },
  plugins: [],
};
export default config;
