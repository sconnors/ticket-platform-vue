<script setup lang="ts">
    import { computed } from 'vue';
    import { useTicketStore } from '@/store';
    import { PageHeader, Ticket } from '@/components';

    const ticketStore = useTicketStore();
    const tickets = computed(() => ticketStore.getTickets);
</script>

<template>
    <section class="flex flex-col justify-center items-center h-full">
        <PageHeader 
            title="Explore. Discover. Experience."
            subtitle="Welcome to our ticketing platform! Find and book tickets for concerts, theater, sports, and more."
        />
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

