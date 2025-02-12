<script setup lang="ts">
    import router from '@/router';
    import { useCartStore, useUserStore } from '@/store';
    import { computed } from 'vue';

    const cartStore = useCartStore();
    const userStore = useUserStore();

    const loggedIn = computed(() => userStore.getLoggedIn);

    const logout = async () => {
        try {
            await userStore.logOut(); 
            router.push('/'); 
        
        } catch (error) {
            console.error('Error deleting data:', error);
        }  
    };
</script>

<template>
    <header class="flex justify-between items-center p-8 text-[#161616]">
        <div>
            <router-link to="/"> 
                <img src="../assets/logo-ticket.svg" alt="Get Your Tickets" class="h-16 sm:h-24">
            </router-link>
        </div>

        <nav>
            <ul class="flex gap-2 sm:gap-4 justify-center items-center">
                <li>
                    <router-link to="/" class="hover:bg-gray-100 p-2 rounded-sm" activeClass="bg-gray-100">Home</router-link> 
                </li>
                <li>
                    <router-link to="/admin" class="hover:bg-gray-100 p-2 rounded-sm" activeClass="bg-gray-100">Admin</router-link> 
                </li>
                <li>
                    <router-link to="/cart" class="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-sm" activeClass="bg-gray-100">
                        <span class="pi pi-shopping-cart text-md!"  :class="{ 'text-[#178740]!': cartStore.getItems.length }"></span>
                        <span>Cart</span>
                    </router-link>
                </li>                
                <li v-if="!loggedIn">
                    <router-link to="/login" class="hover:bg-gray-100 p-2 rounded-sm" activeClass="bg-gray-100">Log In</router-link> 
                </li>
                <li v-if="loggedIn">
                    <button 
                        @click="logout" 
                        class="hover:bg-gray-100 p-2 rounded-sm cursor-pointer" 
                        activeClass="bg-gray-100">
                        Log Out
                    </button> 
                </li>                
            </ul>
        </nav>
    </header>
</template>
