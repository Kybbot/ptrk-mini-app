// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: cloudflare(),
	i18n: {
		defaultLocale: "ru",
		locales: ["ru", "ua"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [react()],
});
