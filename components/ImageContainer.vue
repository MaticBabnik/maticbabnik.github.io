<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEventListener } from '@vueuse/core';

const props = defineProps<{
    images: {
        desc: string;
        src: string;
    }[];
}>();

const activeIndex = ref<number | null>(null);
const activeImage = computed(() =>
    activeIndex.value !== null ? props.images[activeIndex.value] : null
);

function openImage(index: number) {
    activeIndex.value = index;
}

function closeImage() {
    activeIndex.value = null;
}

function prevImage() {
    if (activeIndex.value === null) return;
    activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length;
}

function nextImage() {
    if (activeIndex.value === null) return;
    activeIndex.value = (activeIndex.value + 1) % props.images.length;
}

useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeImage();
    else if (e.key === 'ArrowLeft') prevImage();
    else if (e.key === 'ArrowRight') nextImage();
});

// Redirect vertical wheel scroll to horizontal on the strip
const stripRef = ref<HTMLElement | null>(null);

function onWheel(e: WheelEvent) {
    if (Math.abs(e.deltaX) < 5) {
        e.preventDefault();
        stripRef.value!.scrollLeft += e.deltaY;
    }
}

// Drag-to-scroll
const isDragging = ref(false);
let dragStartX = 0;
let dragScrollLeft = 0;
let hasDragged = false;

function onMouseDown(e: MouseEvent) {
    if (!stripRef.value) return;
    isDragging.value = true;
    hasDragged = false;
    dragStartX = e.pageX;
    dragScrollLeft = stripRef.value.scrollLeft;
    e.preventDefault();
}

useEventListener(window, 'mousemove', (e: MouseEvent) => {
    if (!isDragging.value || !stripRef.value) return;
    const dx = e.pageX - dragStartX;
    if (Math.abs(dx) > 4) hasDragged = true;
    stripRef.value.scrollLeft = dragScrollLeft - dx;
});

useEventListener(window, 'mouseup', () => {
    if (!stripRef.value) return;
    isDragging.value = false;
});
</script>

<template>
    <div class="images" ref="stripRef" @mousedown="onMouseDown" @wheel="onWheel">
        <figure
            class="image"
            v-for="(img, i) in props.images"
            :key="img.src"
            @click="!hasDragged && openImage(i)"
        >
            <img :src="img.src" :alt="img.desc" />
            <figcaption>{{ img.desc }}</figcaption>
        </figure>
    </div>

    <Teleport to="body">
        <div
            v-if="activeImage"
            class="lightbox"
            @click.self="closeImage"
        >
            <div class="lightbox-content">
                <button
                    v-if="props.images.length > 1"
                    class="lightbox-nav lightbox-prev"
                    @click="prevImage"
                    aria-label="Previous"
                >&#x2039;</button>

                <img :src="activeImage.src" :alt="activeImage.desc" />

                <button
                    v-if="props.images.length > 1"
                    class="lightbox-nav lightbox-next"
                    @click="nextImage"
                    aria-label="Next"
                >&#x203A;</button>

                <p class="lightbox-caption">{{ activeImage.desc }}</p>
                <span v-if="props.images.length > 1" class="lightbox-counter">
                    {{ (activeIndex ?? 0) + 1 }} / {{ props.images.length }}
                </span>
                <button class="lightbox-close" @click="closeImage" aria-label="Close">&#x2715;</button>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.images {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0.75rem;
    margin: 1rem 0;
    height: 280px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: black transparent;
    padding-bottom: 0.5rem;
}

.image {
    margin: 0;
    flex-shrink: 0;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    height: 100%;
}

.image img {
    pointer-events: none;
    user-select: none;
    height: calc(100% - 1.6em);
    width: auto;
    max-width: none;
    object-fit: cover;
    display: block;
    transition: opacity 0.1s ease-in-out;
}

.image:hover img {
    opacity: 0.75;
}

figcaption {
    text-align: center;
    color: #444;
    font-size: 0.8em;
    font-style: italic;
    margin-top: 0.3em;
    line-height: 1.3em;
}

/* Lightbox */
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90vw;
    max-height: 90vh;
}

.lightbox-content img {
    max-width: 90vw;
    max-height: 80vh;
    object-fit: contain;
    display: block;
}

.lightbox-caption {
    color: #ccc;
    font-size: 0.85em;
    font-style: italic;
    margin: 0.6em 0 0;
    text-align: center;
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    font-size: 3rem;
    line-height: 1;
    cursor: pointer;
    padding: 0.1em 0.4em;
    opacity: 0.6;
    transition: opacity 0.1s ease-in-out;
    user-select: none;
}

.lightbox-nav:hover {
    opacity: 1;
}

.lightbox-prev {
    left: -3rem;
}

.lightbox-next {
    right: -3rem;
}

.lightbox-counter {
    color: #888;
    font-size: 0.8em;
    margin-top: 0.3em;
    display: block;
    text-align: center;
}

.lightbox-close {
    position: absolute;
    top: -2rem;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 1.4rem;
    cursor: pointer;
    line-height: 1;
    padding: 0.2em;
    opacity: 0.7;
    transition: opacity 0.1s ease-in-out;
}

.lightbox-close:hover {
    opacity: 1;
}
</style>
