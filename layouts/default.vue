<template>
    <div id="layout-default">
        <!-- eslint-disable-next-line vue/no-multiple-template-root -->
        <slot />
        <WireframeBackground id="canvas" />
    </div>
</template>

<style>
#layout-default {
    position: relative;
    min-height: 100vh;
    width: 100%;
}

#canvas {
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    position: fixed;
    z-index: -1;
}
</style>
