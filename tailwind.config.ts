import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // Adjust content paths as needed
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'media', // Enable dark mode based on the user's preference
  plugins: [],
};

export default config;
