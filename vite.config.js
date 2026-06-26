import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: { port: parseInt(process.env.PORT) || 3000 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 620
  }
});
