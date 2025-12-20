import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist-widget",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/Flipcard-widget.js",
      output: {
        entryFileNames: "flipcards-widget.js",
        assetFileNames: "flipcards-widget.[ext]",
      },
    },
  },
});
