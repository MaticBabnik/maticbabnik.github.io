<template>
    <div class="hero-slide">
        <slot />
    </div>
</template>

<style scoped>
.hero-slide {
    scroll-margin: 10px;
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
</style>
