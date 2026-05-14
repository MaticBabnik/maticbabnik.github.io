<script setup lang="ts">
const { data: projects } = useAsyncData(() =>
    queryCollection('projects')
        .select('title', 'description', 'tech', 'path', 'feature')
        .where('feature', '>', 0)
        .order('feature', 'ASC')
        .all(),
);

const { data: count } = useAsyncData(() => queryCollection('projects').count());

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
        <LayoutHeroLinks data-nosnippet>
            <a href="https://github.com/MaticBabnik">GitHub</a>
            <a href="mailto:matic@babnik.io">matic@babnik.io</a>
            <a href="https://discordapp.com/users/331092902677577729">
                Discord
            </a>
        </LayoutHeroLinks>
        <p>
            Human from Slovenia | Studying CompSci @ <a href="https://fri.uni-lj.si/">FRI</a>
        </p>
    </LayoutHeroSlide>

    <LayoutHeroSlide dark>
        <h2 id="projects">Projects</h2>
        <div class="project-list">
            <NuxtLink
                v-for="p in projects ?? []"
                :key="p.path"
                :href="p.path"
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

    <LayoutHeroSlide dark>
        <div class="links-split">
            <div class="links">
                <h2 id="misc">Webring</h2>
                <ul>
                    <li><a href="https://aiken.si/">aiken.si</a></li>
                    <li><a href="https://ass.si/">ass.si</a></li>
                    <li><a href="https://sijanec.eu/">sijanec.eu</a></li>
                    <li><a href="https://ziga.kralj.io/">ziga.kralj.io</a></li>
                </ul>
            </div>
            <div class="links">
                <h2 id="misc">shoutout</h2>
                <ul>
                    <li><a href="https://mirror.tux.si/">mirror.tux.si (arch btw)</a></li>
                    <li><a href="https://leftclick.si/">leftclick hackerspace</a></li>
                    <li><a href="https://brezavta.si/">brezavta</a></li>
                </ul>
            </div>
        </div>
    </LayoutHeroSlide>
</template>

<style scoped>
h1, h2 {
    font-family: 'Major Mono Display', monospace;
    font-weight: normal;
    color: var(--c-text)
}

h1 {
    font-size: min(10vw, 96px);
    margin: 2rem 0;
}

h2 {
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
    background-color: color-mix(in srgb, var(--c-bg) 20%, #0000);
}

.links-split {
    display: flex;
    gap: 4rem;
    flex-wrap: wrap;
    justify-content: center;
}

.links-split h2 {
    font-size: 48px;
}

@media (max-width: 800px) {
    .links-split {
        flex-direction: column;
        gap: 2rem;
    }
}
</style>
