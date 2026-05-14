<script setup lang="ts">
const props = defineProps<{
    dark?: boolean
}>()
</script>

<template>
    <div class="hero-slide" :class="{ dark: props.dark }">
        <div class="filter" v-if="props.dark"></div>
        <slot />
    </div>
</template>

<style scoped>
.hero-slide {
    scroll-margin: 0;
    scroll-snap-align: start start;
    scroll-snap-stop: always;

    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.hero-slide.dark {
    --c-text: white;
    --c-bg: black;

    color: var(--c-text);
}

.filter {
    backdrop-filter: invert(1);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>
