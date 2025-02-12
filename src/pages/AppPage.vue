<script setup lang="ts">    
    import { Footer, Header } from '@/components';
</script>

<template>
    <Header />

    <main class="flex-1 p-8 max-w-7xl mx-auto w-full">
        <router-view/>
    </main>

    <Footer />
</template>
