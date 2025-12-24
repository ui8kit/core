import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../..');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(root, 'tests/**/*.{js,ts,jsx,tsx}'),
    path.join(root, 'src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Disable preflight to keep the playground isolated
    preflight: false,
  },
};
