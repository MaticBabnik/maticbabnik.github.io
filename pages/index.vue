<script setup lang="ts">
const { data: projects } = useAsyncData(() =>
    queryContent('projects')
        .only(['title', 'description', 'tech', '_path'])
        .where({ feature: { $gt: 0 } })
        .sort({ feature: 1 })
        .find(),
);

const { data: count } = useAsyncData(() => queryContent('projects').count());

useSeoMeta({
    titleTemplate: 'Matic Babnik',
    description: "Matic Babnik's personal website",
    ogTitle: 'Matic Babnik',
    ogDescription: "Matic Babnik's personal website",
    ogUrl: 'https://babnik.io/',
    ogImage: '/img/og.png',
});

useHead({
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

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <LayoutHeroSlide>
        <h1 id="top">Matic Babnik</h1>
        <LayoutHeroLinks>
            <a href="https://github.com/MaticBabnik">GitHub</a>
            <a href="mailto:matic@babnik.io">matic@babnik.io</a>
            <a href="https://discordapp.com/users/331092902677577729">
                Discord
            </a>
        </LayoutHeroLinks>
        <p>
            Dev @ <a href="https://www.spica.com/">Spica</a> | Student @
            <a href="https://fri.uni-lj.si/">FRI</a>
        </p>
    </LayoutHeroSlide>

    <LayoutHeroSlide>
        <h2 id="projects">Projects</h2>
        <div class="project-list">
            <NuxtLink
                v-for="p in projects ?? []"
                :key="p._path"
                :href="p._path"
                class="blocklink"
            >
                <ProjectCard :project="p" />
            </NuxtLink>

            <NuxtLink href="/projects" class="see-all">
                See all ({{ count }})
            </NuxtLink>
        </div>
    </LayoutHeroSlide>

    <LayoutHeroSlide>
        <h2 id="blog">Blog</h2>
        <GhostPosts
            base-url="https://blog.babnik.io"
            api-key="89421edd450efd53a52a368eb3"
            :limit="5"
        />
    </LayoutHeroSlide>

    <LayoutHeroSlide>
        <h2 id="misc">Friends online</h2>
        <ul>
            <li><a href="https://aiken.si/">aiken.si</a></li>
            <li><a href="https://ass.si/">ass.si</a></li>
            <li><a href="https://gapi.me/">gapi.me</a></li>
            <li><a href="https://skret.net/">skret.net</a></li>
            <li><a href="https://studen.me/">studen.me</a></li>
            <li><a href="https://ziga.kralj.io/">ziga.kralj.io</a></li>
        </ul>
    </LayoutHeroSlide>
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
    gap: 0.25rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;

    border-top: 1px solid black;
    backdrop-filter: blur(5px);
    background-color: #fff8;
}
</style>
