<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <!--hello-->
    <a rel="me" href="https://toot.si/@matic" style="display: none">Mastodon</a>
</template>

<script lang="ts" setup>
import '~/assets/style.css';

useHead({
    titleTemplate(title) {
        return title ? `${title} - Matic Babnik` : 'Matic Babnik';
    },
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.png',
        }
    ],
});
</script>
