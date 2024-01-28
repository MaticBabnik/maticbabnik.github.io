<template>
    <div class="links">
        <slot />
    </div>
</template>

<style>
.links {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.links a {
    opacity: 100%;
    transition: ease-in-out 0.1s opacity;
}

.links:has(a:hover) a {
    opacity: 50%;
}

.links a:hover {
    opacity: 100% !important;
}
</style>
