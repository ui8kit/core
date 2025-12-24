export default {
  plugins: {
    tailwindcss: { config: new URL('./tailwind.config.tests.js', import.meta.url).pathname },
    autoprefixer: {},
  },
};
