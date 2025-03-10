import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from '@tanstack/react-start/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
    ],
  },
  server: {
    preset: 'netlify',
  },
});
