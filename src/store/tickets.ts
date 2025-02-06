import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Ticket } from '@/utils/types';

export const useTicketStore = defineStore('ticket', {
    state: () => ({
        tickets: [] as Ticket[],
        loading: false,
        deleting: false
    }),
    getters: {
        getTickets: (state) => state.tickets,
        getLoading: (state) => state.loading,
        getDeleting: (state) => state.deleting
    },
    actions: {
        async addTicket (value: Ticket) {
            if (this.loading) return;

            try {
                this.loading = true;
                
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.tickets.push({
                    ...value,
                    id : uuidv4(), 
                });
                
            } catch (error) {
                // catch error
                console.log(error);
            } finally {
                this.loading = false;
            }     
        },
        async deleteTicket (ticketId: string) {
            if (this.deleting) return;

            try {
                this.deleting = true;
                
                await new Promise(resolve => setTimeout(resolve, 1000)); 

                this.tickets = this.tickets.filter((item) => item.id !== ticketId);

            } catch (error) {
                console.log(error)
            } finally {
                this.deleting = false;
            }
        }  
    }
});