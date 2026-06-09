import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Doit correspondre exactement au nom du dépôt GitHub Pages,
  // avec un slash au début et à la fin : https://noabigeard.github.io/PortolioS4/
  base: "/PortolioS4/",
});
