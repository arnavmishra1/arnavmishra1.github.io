import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      // <marquee>, <center> and <font> are real (if ancient) HTML tags used by the
      // "old" theme, not Vue components.
      template: { compilerOptions: { isCustomElement: (tag) => ['marquee', 'blink', 'center', 'font'].includes(tag) } },
    }),
  ],
  // Relative asset paths, so the build works from any GitHub Pages folder.
  base: './',
})
