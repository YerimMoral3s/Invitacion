import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Cambia la base a '/'
  // base: 'https://yerimmoral3s.github.io/Inivitacion/',
});
