<script setup lang="ts">
    import { Button, Select } from 'primevue';
    import { computed, ref } from 'vue';
    import type { Ticket } from '@/utils/types';
    import { formatCurrency } from '@/utils/helpers';
    import { useCartStore, useTicketStore} from '@/store';

    const props = defineProps<{
        ticketData: Ticket,
        isAdmin: boolean
    }>(); 
    
    const ticketStore = useTicketStore();
    const cartStore = useCartStore();

    const ticketAmount = ref([1, 2, 3, 4, 5, 6, 7, 8]);
    const selectedAmount = ref(1);

    const deleteTicket = async (id: string) => {
        try {
            await ticketStore.deleteTicket(id); 
        } catch (error) {
            console.error('Error deleting data:', error);
        }    
    };

    const addToCart = async (ticket: Ticket) => {
        try {
            await cartStore.addToCart({
                ...ticket,
                amount: selectedAmount.value
            }); 
        } catch (error) {
            console.error('Error deleting data:', error);
        }    
    };

    const ticketPrice = computed(() => formatCurrency(props.ticketData.price));
</script>

<template>
    <div class="flex items-center py-2 px-4 mb-4 gap-4 border border-[#cbd5e1] rounded-md w-full hover:shadow-md transition">
        <div>
            <span class="relative! flex justify-center items-center pi pi-ticket text-[42px]! md:text-[64px]! text-black" 
                :class="{ 'text-[#8C742B]!': ticketData.isVIP }">
                <span  v-if="ticketData.isVIP" class="abs-center text-[12px]! md:text-[18px]!">VIP</span>  
            </span>
        </div>
        <div class="basis-1/3">
            <p class="font-semibold">{{ ticketData.name }}</p>
            <p class="text-sm text-[#334155]">{{ ticketData.description }}</p>
        </div>
        
        <div class="flex gap-4 justify-center items-center ml-auto">
            <p class="font-semibold text-base leading-4">
                {{ ticketPrice }} 
                <span class="font-normal text-xs">each</span> 
            </p>

            <template v-if="!isAdmin">
                <Select 
                    v-model="selectedAmount" 
                    id="amount" 
                    :options="ticketAmount" 
                    aria-label="Select Amount" 
                />                
                <Button 
                    icon="pi pi-shopping-cart" 
                    @click="addToCart(ticketData)" 
                    :loading="cartStore.getLoading" 
                    severity="success" 
                    aria-label="Add to Shopping Cart" 
                />
            </template>

            <template v-if="isAdmin">
                <Button 
                    icon="pi pi-trash" 
                    @click="deleteTicket(ticketData.id)" 
                    severity="danger" 
                    :loading="ticketStore.getDeleting" 
                    aria-label="Delete ticket"  
                />
            </template>
        </div>
    </div>
</template>
