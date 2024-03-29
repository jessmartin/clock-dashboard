import { defineConfig } from "vite";
import { ConfigPlugin } from "@dxos/config/vite-plugin";
import { VaultPlugin } from "@dxos/vault/vite-plugin";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  build: {
    outDir: "out/clock-dashboard",
  },

  plugins: [
    VaultPlugin(),
    ConfigPlugin(),
    react({ jsxRuntime: "classic" }),
    VitePWA({
      registerType: "prompt",
      workbox: {
        maximumFileSizeToCacheInBytes: 30000000,
      },
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "clock-dashboard",
        short_name: "clock-dashboard",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icons/icon-32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "icons/icon-256.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
