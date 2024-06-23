<script setup lang="ts">
const props = defineProps<{
    images: {
        desc: string;
        src: string;
    }[];
}>();
</script>

<template>
    <div class="images">
        <figure class="image" v-for="img in props.images">
            <img :src="img.src" :alt="img.desc" />
            <figcaption>{{ img.desc }}</figcaption>
        </figure>
    </div>
</template>

<style scoped>
.images {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
}

@media screen and (max-width: 1280px) {
    .images {
        flex-direction: column;
    }
}

.image {
    margin: 0;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    max-width: 800px;
}

img {
    /* width: 100%; */
    max-width: 100%;
    max-height: 100%;
}

figcaption {
    text-align: center;
    color: #444;
    font-size: 0.8em;
    font-style: italic;
}
</style>
