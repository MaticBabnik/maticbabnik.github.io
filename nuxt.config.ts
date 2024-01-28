// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: 'NUXT_DEVTOOLS' in process.env },
    modules: ['@nuxt/content', '@nuxtjs/google-fonts'],
    googleFonts: {
        families: {
            Inter: {
                wght: [400, 700],
            },
            'Major Mono Display': true,
        },
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/favicon.ico',
                },
            ],
        },
    },
});
