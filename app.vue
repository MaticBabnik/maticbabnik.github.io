<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
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
        },
    ],
});
</script>
