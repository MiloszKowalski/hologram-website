// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import svgr from "vite-plugin-svgr";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      svgr({
        include: "**/*.svg?react",
        svgrOptions: {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          svgoConfig: {
            plugins: [
              "preset-default",
              "removeTitle",
              "removeDesc",
              "removeDoctype",
              "cleanupIds",
            ],
          },
        },
      }),
    ],
    server: {
      allowedHosts: [".share.zrok.io"],
    },
    preview: {
      allowedHosts: ["3lr587gcsin9.share.zrok.io"],
    },
  },
  integrations: [react()],
});
