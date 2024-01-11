import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";
import icon from "astro-icon";
import lottie from "astro-integration-lottie";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { autolinkConfig } from "./plugins/rehype-autolink-config";

import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
    site: "https://chancesoftwarellc.com/",
    vite: {
        define: {
            __DATE__: `'${new Date().toISOString()}'`
        }
    },
    integrations: [tailwind(), icon(), sitemap(), alpinejs(), lottie(), AstroPWA({
        mode: "production",
        base: "/",
        scope: "/",
        includeAssets: ["favicon.svg"],
        registerType: "autoUpdate",
        manifest: {
            name: "Chance Software LLC",
            short_name: "Chance Software",
            theme_color: "#ffffff",
            icons: [{
                src: "pwa-192x192.png",
                sizes: "192x192",
                type: "image/png"
            }, {
                src: "pwa-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }, {
                src: "pwa-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable"
            }]
        },
        workbox: {
            navigateFallback: "/404",
            globPatterns: ["*.js"]
        },
        devOptions: {
            enabled: false,
            navigateFallbackAllowlist: [/^\/404$/],
            suppressWarnings: true
        }
    }), purgecss()],
    markdown: {
        rehypePlugins: [rehypeSlug,
            // This adds links to headings
            [rehypeAutolinkHeadings, autolinkConfig]]
    },
    experimental: {
        contentCollectionCache: true
    }
});