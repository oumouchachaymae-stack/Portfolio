import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const tailwindcssPackage = '@tailwindcss/vite';

export default defineConfig(async () => {
  let tailwindPlugin;
  try {
    const tailwindcss = await import(tailwindcssPackage);
    tailwindPlugin = tailwindcss.default();
  } catch {
    // Continue without the Tailwind Vite plugin if it is not installed.
  }

  return {
    plugins: [react(), ...(tailwindPlugin ? [tailwindPlugin] : [])],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
