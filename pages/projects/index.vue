<script setup lang="ts">
const { data: projects } = useAsyncData(() =>
    queryContent('projects')
        .only(['title', 'description', 'tech', '_path'])
        .sort({ feature: 1 })
        .find(),
);

useSeoMeta({
    title: 'Projects',
    description: "Matic Babnik's projects",
    ogTitle: 'Projects',
    ogDescription: "Matic Babnik's projects",
    ogImage: '/img/og.png',
});
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <div class="wrapper">
        <h2 id="projects">Projects</h2>
        <div class="project-list">
            <a
                v-for="p in projects ?? []"
                :key="p._path"
                :href="p._path"
                class="blocklink hover-opacity"
            >
                <ProjectCard :project="p" />
            </a>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-family: 'Major Mono Display', monospace;
    font-weight: normal;
    font-size: min(10vw, 96px);
    margin: 2rem 0;
}

h2 {
    font-family: 'Major Mono Display', monospace;
    font-weight: normal;
    font-size: min(7vw, 48px);
    margin: 1rem 0;
}

.wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.project-list {
    display: grid;

    width: 90%;
    max-width: 1000px;
    grid-template-columns: repeat(
        auto-fit,
        minmax(/* my grid drained */ 333px, 1fr)
    );
    grid-auto-rows: 1fr;
    gap: 0.5rem;
}

ul {
    list-style-type: circle;
}

ul li {
    padding: 0.25rem 0;
}
.see-all {
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid black;
    border-radius: 0.5rem;
}
</style>
