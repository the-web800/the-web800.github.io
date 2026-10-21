// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	site: "https://the-web800.github.io",
	integrations: [svelte(), expressiveCode(), sitemap(), icon(), mdx()],
	redirects: {
		"/gameni/": "/works/gameni/",
		"/gameni/terms/": "/works/gameni/terms/",
		"/gameni/privacy/": "/works/gameni/privacy/",
		"/gameni/support/": "/works/gameni/support/",
	},
});
