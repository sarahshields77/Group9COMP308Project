// client/shell-app/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shellApp",
      remotes: {
        authApp: "http://localhost:3001/assets/remoteEntry.js",
        communityApp: "http://localhost:3002/assets/remoteEntry.js",
        eventsApp: "http://localhost:3003/assets/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "@apollo/client": { singleton: true, requiredVersion: "^3.9.5" },
      }
    })
  ],
  server: {
    port: 3000,
    strictPort: true
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  }
});

