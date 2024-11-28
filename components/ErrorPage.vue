<template>
    <div id="error">
        <div class="tape" />
        <slot>
            <h1>Under construction</h1>
        </slot>
        <NuxtLink href="/" @click.capture="back">Go back</NuxtLink>
        <div class="tape" />
    </div>
</template>

<script lang="ts" setup>
function back() {
    const rt = useRouter();
    rt.back();
    // if nothing happend
    rt.push('/');
}

useSeoMeta({
    title: 'Error',
});
</script>

<style scoped>
#error {
    position: sticky;
    top: 50%;
    left: 0;
    right: 0;

    transform: translateY(-50%);

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: stretch;

    gap: 1rem;

    border: 1px solid black;
    border-left: none;
    border-right: none;
}

#error:deep(h1) {
    margin: 0;
    font-family: 'Major Mono Display';
    text-align: center;
    font-size: 3rem;
    font-weight: normal;
    text-transform: lowercase; /* get rid of bold characters in 'Major Mono Display' */
}

.tape {
    background-image: url('~/assets/contructionTape.svg');
    height: 36px;
    width: 100%;
}
</style>
