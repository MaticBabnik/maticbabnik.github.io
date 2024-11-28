<template>
    <article class="article-card">
        <div class="tech">
            <h3>{{ $props.project.title }}</h3>
            <div class="space" />
            <svg
                v-for="techName in $props.project.tech ?? []"
                :key="techName"
                view-box="0 0 32 32"
            >
                <use :xlink:href="tech + '#' + techName" />
            </svg>
        </div>
        <p>{{ $props.project.description ?? ' ' }}</p>
    </article>
</template>

<script lang="ts" setup>
import tech from '~/assets/tech.svg';

interface IProjectMeta {
    title: string;
    description: string;
    tech: string[];
    links: Record<string, string>;
}

defineProps<{
    project: IProjectMeta | any; // TODO: I wish there was a better way
}>();
</script>

<style scoped>
article {
    display: flex;
    gap: 0.25rem;
    flex-direction: column;
    padding: 0.5rem;

    border-top: 1px solid black;
    backdrop-filter: blur(5px);
    background-color: #fff8;
}

h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0.25rem 0;
}

.tech {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.space {
    flex-grow: 1;
}

.tech svg {
    width: 16px;
    height: 16px;
}

.tech svg use {
    transform: scale(0.5);
}

p {
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0;
}
</style>
