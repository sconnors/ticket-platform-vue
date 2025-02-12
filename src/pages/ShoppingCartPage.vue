<script setup lang="ts">
    import { computed } from 'vue';
    import { useCartStore } from '@/store';
    import { ShoppingCartItem } from '@/components';
    import { formatCurrency } from '@/utils/helpers';

    const cartStore = useCartStore();

    const items = computed(() => cartStore.getItems);
    const itemsTotal = computed(() => cartStore.getItemsTotal);
    const priceTotal = computed(() => formatCurrency(cartStore.getPriceTotal));
</script>

<template>
    <div class="flex flex-col md:flex-row rounded-md overflow-hidden">
        <section class="basis-3/4 p-8">
            <div class="flex justify-between items-center gap-4 mb-10">
                <h1 class="text-3xl lg:text-4xl mb-2">Shopping Cart</h1>
                <p class="font-semibold"> {{ itemsTotal }} items</p>
            </div>

            <p v-if="!items.length" class="text-lg">Your Shopping Cart is Empty</p>

            <template v-if="items.length">
                <ul  class="flex flex-col border-b border-[#cbd5e1] mb-8">
                    <li v-for="item in items" :key="item.id" class="border-t border-[#cbd5e1]">
                        <ShoppingCartItem :itemData="item" />
                    </li>
                </ul>

                <router-link to="/" class="mt-8"><span class="pi pi-arrow-left"></span> Edit Cart </router-link>
            </template>
        </section>
        
        <section class="flex flex-col justify-between basis-1/4 p-8 bg-gray-100">
            <h2 class="text-3xl lg:text-4xl mb-2">Summary</h2>
            <p class="font-semibold">Total Price: {{ priceTotal }}</p>
        </section>
    </div>
</template>