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
    }
});
</script>
