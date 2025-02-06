<script setup lang="ts">
    import { computed } from 'vue';
    import { useTicketStore } from '@/store';
    import { Ticket } from '@/components';

    const ticketStore = useTicketStore();
    const tickets = computed(() => ticketStore.getTickets);
</script>

<template>
    <section class="flex flex-col justify-center items-center h-full">
        <h1 class="text-3xl lg:text-4xl mb-2">Explore. Discover. Experience.</h1>
        <p class="text-xl text-center mb-12">Welcome to our ticketing platform! Find and book tickets for concerts, theater, sports, and more.</p>
    </section>

    <section>
        <h2 class="text-2xl mb-8">Tickets</h2>
        
        <p v-if="!tickets.length" class="text-lg">No tickets are available at this time.</p>

        <ul>
            <li v-for="item in tickets" :key="item.id">
                <Ticket :ticketData="item" :isAdmin="false" />
            </li>
        </ul>
    </section>
</template>

<style scoped>

    .label {
        transition-property: all;
        transition-timing-function: ease;
        line-height: 1;
        font-size: var(--p-iftalabel-font-size);
        font-weight: var(--p-iftalabel-font-weight);
        inset-inline-start: var(--p-iftalabel-position-x);
        color: var(--p-iftalabel-color);
        transition-duration: var(--p-iftalabel-transition-duration);
    }

</style>


