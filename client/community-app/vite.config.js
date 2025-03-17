// client/community-app/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "communityApp",
      filename: "remoteEntry.js", 
      exposes: {
        "./App": "./src/App",
      },
      shared: ["react", "react-dom", "@apollo/client", "graphql"]
    }),
  ],
  server: {
    port: 3002, 
    strictPort: true
  },
  build: {
    outDir: "dist",
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  }
});
