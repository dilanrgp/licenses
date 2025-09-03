import { defineConfig } from 'vite';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

export default defineConfig({
  plugins: [
    ckeditor5({
      // Ruta al paquete del tema Lark
      theme: require.resolve('@ckeditor/ckeditor5-theme-lark')
    })
  ]
});