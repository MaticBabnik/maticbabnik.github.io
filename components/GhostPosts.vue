<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    baseUrl: string;
    apiKey: string;
    limit: number;
}>();

const posts = ref<any>([]);
const loading = ref(true);
const error = ref(false);

async function fetchPosts(baseUrl: string, key: string, limit = 5) {
    const url = new URL(baseUrl);
    url.pathname = '/ghost/api/content/posts';
    url.searchParams.set('key', key);
    url.searchParams.set('include', 'tags,title,excerpt,url,published_at');
    url.searchParams.set('limit', limit.toString());

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    posts.value = data;
}

fetchPosts(props.baseUrl, props.apiKey, props.limit)
    .then(() => {
        error.value = false;
        loading.value = false;
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.error({ newsError: err });
        error.value = true;
        loading.value = false;
    });

function timeAgo(t: number | string | Date) {
    const seconds = Math.floor(
        (new Date().valueOf() - new Date(t).valueOf()) / 1000,
    );

    let interval = seconds / 31536000;

    if (interval >= 1) {
        return Math.floor(interval) + ' year' + (interval >= 2 ? 's' : '');
    }
    interval = seconds / 2592000;
    if (interval >= 1) {
        return Math.floor(interval) + ' month' + (interval >= 2 ? 's' : '');
    }
    interval = seconds / 86400;
    if (interval >= 1) {
        return Math.floor(interval) + ' day' + (interval >= 2 ? 's' : '');
    }
    interval = seconds / 3600;
    if (interval >= 1) {
        return Math.floor(interval) + ' hour' + (interval >= 2 ? 's' : '');
    }
    interval = seconds / 60;
    if (interval >= 1) {
        return Math.floor(interval) + ' minute' + (interval >= 2 ? 's' : '');
    }
    return 'just now';
}
</script>

<template>
    <ClientOnly>
        <div class="news">
            <template v-if="loading">
                <div class="loading">loading...</div>
            </template>
            <template v-else-if="error">
                <div class="error">Error loading news</div>
            </template>
            <div v-else class="articles-wrapper">
                <a
                    v-for="item in posts.posts"
                    :key="item.id"
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="article transition blocklink"
                >
                    <h3 class="title">{{ item.title }}</h3>
                    <p class="description">{{ item.excerpt }}</p>

                    <div class="tags">
                        <span
                            v-for="tag in item.tags"
                            :key="tag.slug"
                            class="tag"
                        >
                            {{ tag.name }}
                        </span>
                        <span class="tag">{{
                            timeAgo(item.published_at)
                        }}</span>
                    </div>
                </a>
            </div>
        </div>
    </ClientOnly>
</template>

<style scoped>
.articles-wrapper {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    background-color: #ffffff88;
}

.article {
    display: flex;
    gap: 0.25rem;
    flex-direction: column;
    padding: 0.5rem;

    border-top: 1px solid black;
    backdrop-filter: blur(5px);
}

.article .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
}

.article:hover .title {
    opacity: 100%;
}

.article .description {
    font-size: 0.8rem;
    margin: 0;
}

.article .tags {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

.article .tags .tag {
    background-color: black;
    color: white;
    padding: 0.1rem 0.4rem;
    font-size: 0.75rem;
    border-radius: 1rem;
}
</style>
