<template>
    <NuxtLayout>
        <ErrorPage>
            <h1>
                {{ $props.error.statusCode ?? 'Something went wrong' }}
            </h1>
        </ErrorPage>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import '~/assets/style.css';
import ErrorPage from '~/components/ErrorPage.vue';

defineProps<{ error: any }>();
</script>
