// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-04-20',


    ssr: true,
    site: {
        url: 'https://babnik.io',
        name: 'Matic Babnik',
        defaultLocale: 'en',
    },
    nitro: {
        plugins: ['plugins/ogImage.ts'],
        static: true,
        prerender: {
            crawlLinks: true,
            routes: ['/sitemap.xml', '/robots.txt'],
        },
    },
    devtools: { enabled: 'NUXT_DEVTOOLS' in process.env },
    modules: [
        '@nuxt/content',
        '@nuxtjs/google-fonts',
        '@nuxt/image',
        '@nuxtjs/seo',
    ],
    googleFonts: {
        families: {
            Inter: {
                wght: [400, 700],
            },
            'Major Mono Display': true,
        },
    },
    ogImage: {
        zeroRuntime: true,
    }
});
