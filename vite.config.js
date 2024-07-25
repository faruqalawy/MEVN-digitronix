import { fileURLToPath, URL } from 'node:url';
import viteCompression from 'vite-plugin-compression';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 0, // Mengompresi semua file tanpa batas ukuran
      algorithm: 'brotliCompress', // Gzip atau Brotli
      ext: '.br', // Untuk Brotli, gunakan .br
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
