import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueTypeImports from "vite-plugin-vue-type-imports";

import path from "path";

import dns from "dns";
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueTypeImports()],
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  base: "/roistat-test/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
