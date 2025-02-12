<script setup lang="ts">
    import type { HeroProps } from '@/utils/types';

    const { subtitle = '', title } = defineProps<HeroProps>();
</script>


<template>
    <h1 class="text-3xl lg:text-4xl mb-2">{{ title }}</h1>
    <p v-if="subtitle" class="text-xl text-center mb-12">{{ subtitle }}</p>
</template>