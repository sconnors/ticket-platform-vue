<script setup lang="ts">
    import { computed } from 'vue';
    import { useTicketStore } from '@/store';
    import { Ticket, TicketForm } from '@/components';    

    const ticketStore = useTicketStore();
    const tickets = computed(() => ticketStore.getTickets);
</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl lg:text-4xl mb-2">Admin</h1>
        <p class="text-xl text-center mb-12">Easily create and manage your events with our simple ticketing system.</p>

        <div class="flex flex-col md:flex-row sm:p-8 gap-12 w-full"> 
            <section class="basis-1/3">
                <h2 class="text-2xl mb-8">Create Event Ticket</h2>
                <TicketForm />
            </section>

            <section class="basis-2/3">
                <h2 class="text-2xl mb-8">Tickets</h2>
                
                <p v-if="!tickets.length" class="text-lg">No tickets are available at this time.</p>

                <ul>
                    <li v-for="item in tickets" :key="item.id">
                        <Ticket :ticketData="item" :isAdmin="true" />
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<style scoped>

</style>
