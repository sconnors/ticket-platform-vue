<script setup lang="ts">
    import { Button } from 'primevue';
    import { computed } from 'vue';
    import type { Ticket } from '@/utils/types';
    import { formatCurrency } from '@/utils/helpers';
    import { useCartStore } from '@/store';

    const props = defineProps<{ itemData: Ticket }>(); 
    const cartStore = useCartStore();

    const deleteItem = async (id: string) => {
        try {
            await cartStore.deleteFromCart(id); 
        } catch (error) {
            console.error('Error deleting data:', error);
        }    
    };

    const itemTotal = computed(() => formatCurrency(props.itemData.price) );
</script>

<template>
    <div class="flex justify-between items-center py-2 px-4 gap-4 w-full">
        <div>
            <span class="relative! flex justify-center items-center pi pi-ticket text-[42px]! md:text-[64px]! text-black" 
                :class="{ 'text-[#8C742B]!': itemData.isVIP }">
                <span v-if="itemData.isVIP" class="abs-center text-[12px]! md:text-[16px]!">VIP</span>  
            </span>
        </div>
        <div class="basis-1/2">
            <p class="font-semibold">{{ itemData.name }}</p>
            <p class="text-sm text-[#334155]">{{ itemData.description }}</p>
        </div>
        <div class="flex gap-4 justify-center items-center ml-auto" >
            <p class="font-semibold"> {{ itemTotal }} x {{ itemData.amount }}</p>
            <Button 
                icon="pi pi-trash" 
                @click="deleteItem(itemData.id)" 
                severity="danger" 
                :loading="cartStore.getDeleting" 
                aria-label="Delete Item"  
            />
        </div>
    </div>
</template>
