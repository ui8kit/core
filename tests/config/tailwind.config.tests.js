/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './tests/**/*.{js,ts,jsx,tsx}',
    './tests/components/**/*.{js,ts,jsx,tsx}',
    '../../src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Отключаем сброс стилей для изоляции тестов
  },
};
