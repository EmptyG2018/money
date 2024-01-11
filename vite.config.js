import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@package_admin": path.resolve(__dirname, "./src/packages/_admin"),
      "@package_collection": path.resolve(__dirname, "./src/packages/collection"),
      "@package_community": path.resolve(__dirname, "./src/packages/community"),
      "@package_exam": path.resolve(__dirname, "./src/packages/exam"),
      "@package_navigation": path.resolve(__dirname, "./src/packages/navigation"),

      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),     
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.relative(__dirname, "./src/utils"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@plugins": path.resolve(__dirname, "./src/plugins"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  server: {
    proxy: {
      "/proxy": {
        target: "http://html.4kjd.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    },
  },
});
