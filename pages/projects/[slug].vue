<script setup lang="ts">
import tech from '~/assets/tech.svg';
import ImageContainer from '~/components/ImageContainer.vue';

const route = useRoute();

const { data: article } = useAsyncData(`proj-${route.params.slug}`, () =>
    queryContent(route.path).findOne(),
);

const { data: nav } = useAsyncData(`proj-${route.params.slug}-nav`, () =>
    queryContent()
        .only(['_path', 'title'])
        .sort({ feature: 1 })
        .findSurround(route.path),
);

useContentHead(article);
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <div class="wrapper">
        <div class="proj">
            <div class="content-nav">
                <NuxtLink replace v-if="nav?.[0]" :to="nav?.[0]._path">
                    Previous: {{ nav?.[0].title }}
                </NuxtLink>

                <NuxtLink
                    replace
                    v-if="nav?.[1]"
                    :to="nav?.[1]._path"
                    class="next"
                >
                    Next: {{ nav?.[1].title }}
                </NuxtLink>
            </div>
            <article class="project">
                <h1>
                    {{ article?.title }}

                    <svg
                        v-for="techName in article?.tech ?? []"
                        :key="techName"
                        view-box="0 0 32 32"
                    >
                        <use :xlink:href="tech + '#' + techName" />
                    </svg>
                </h1>
                <div class="links">
                    <a
                        v-for="(v, k) in article?.links"
                        :key="k"
                        :href="v"
                        class="link"
                        >{{ k }}</a
                    >
                </div>
                <ContentRenderer :value="article" />
                <ImageContainer
                    v-if="article?.images"
                    :images="article.images"
                />
            </article>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 2em;
    font-weight: normal;
}

h1 svg {
    display: inline;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    margin-right: 0.1em;
}

.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

.proj {
    max-width: 1280px;

    position: relative;
    min-height: 100vh;
    height: fit-content;
    width: 100%;
    box-sizing: border-box;

    background-color: #fffa;
    padding-left: 1em;
    padding-right: 1em;
    backdrop-filter: blur(5px);
}

.links {
    width: 100%;
    border-bottom: 2px solid black;
    display: flex;
    flex-direction: row;
    justify-content: start;
}

.links a {
    display: block;
    margin: 0.5rem 0;
    text-decoration: none;
}

.project {
    height: 100%;
}

.project h1 {
    margin: 0.5rem 0;
}

.content-nav {
    display: block;
    width: 100%;
    padding-block: 1em;
}

.next {
    float: right;
}
</style>
