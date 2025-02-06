import { defineStore } from 'pinia'
import type { Ticket } from '@/utils/types';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as Ticket[],
        loading: false,
        deleting: false
    }),
    getters: {
        getItems: (state) => state.items,
        getLoading: (state) => state.loading,
        getDeleting: (state) => state.deleting,
        getItemsTotal: (state) => state.items.reduce((acc:number, curr: Ticket) => acc + curr.amount, 0),
        getPriceTotal: (state) => state.items.reduce((acc:number, curr: Ticket) => acc + ( curr.price * curr.amount), 0)
    },
    actions: {
        async addToCart (value: Ticket) {
            if (this.loading) return;

            try {
                this.loading = true;
                
                await new Promise(resolve => setTimeout(resolve, 1000));

                const hasIndex = this.items.findIndex((item) => item.id === value.id);

                if (hasIndex >= 0 ) {
                    this.items[hasIndex] = value;
                } else {
                    this.items.push({ ...value });
                }
            } catch (error) {
                // catch error
                console.log(error);
            } finally {
                this.loading = false;
            }  
        },
        async deleteFromCart (ticketId: string) {
            if (this.deleting) return;

            try {
                this.deleting = true;
                
                await new Promise(resolve => setTimeout(resolve, 1000)); 

                this.items = this.items.filter((item) => item.id !== ticketId);

            } catch (error) {
                console.log(error)
            } finally {
                this.deleting = false;
            }
        }   
    }
});