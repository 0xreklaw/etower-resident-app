import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fsebzomnldetfkvttpec.supabase.co', // replace with your Supabase endpoint without the '/api' part
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // This will remove the "/api" prefix from the API calls made in your app
      }
    }
  }
});
