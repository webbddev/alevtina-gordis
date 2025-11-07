const config = {
  plugins: {
    '@tailwindcss/postcss': {
      // Add this 'theme' object
      theme: {
        extend: {
          fontFamily: {
            // This maps --font-geist-sans to the 'font-sans' utility
            sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],

            // This maps --font-geist-mono to 'font-mono'
            mono: ['var(--font-geist-mono)', 'monospace'],

            // This creates a NEW 'font-funnel-sans' utility
            funnel: ['var(--font-funnel-sans)', 'sans-serif'],
          },
        },
      },
    },
  },
};

export default config;
