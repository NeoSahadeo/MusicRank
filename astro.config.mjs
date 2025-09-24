// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import deno from "@deno/astro-adapter";

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: deno({
    //options go here
  }),

  integrations: [react(), svelte()],
});
