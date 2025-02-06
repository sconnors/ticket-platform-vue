import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { Ticket } from '@/components';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';


describe('Ticket Component', () => {
    const pinia = createPinia();

    let wrapper: any; 

    beforeEach(() => {
        wrapper = mount(Ticket, {
            props: {
                ticketData: {
                    id: '1',
                    name: 'Concert Ticket',
                    description: 'General Admission',
                    price: 100,
                    isVIP: false,
                    count: 1,
                    amount: 0
                },
                isAdmin: false,
            },
            global: {
                plugins: [pinia, PrimeVue],
            },
        }); 
    });

    describe('Tickets for Non Admin page', () => {

        it('renders ticket name and price correctly', async () => {
            await wrapper.vm.$nextTick(); 

            expect(wrapper.text()).toContain('Concert Ticket');
            expect(wrapper.text()).toContain('$100.00'); 
        });

        it('renders "Add to Cart" button for non-admin users', async () => {
            await wrapper.vm.$nextTick(); 

            expect(wrapper.find('span[aria-label="Select Amount"]').exists()).toBe(true);
            expect(wrapper.find('button[aria-label="Add to Shopping Cart"]').exists()).toBe(true);
        });
    });

    describe('Tickets for Admin page', () => {
        
        beforeEach(() => {
            wrapper.setProps({   
                ticketData: {
                    ...wrapper.props().ticketData,
                    isVIP: true
                },
                isAdmin: true
            }); 
        });

        it('renders VIP ticket and "Delete" button', async () => {
            await wrapper.vm.$nextTick(); 

            expect(wrapper.find('.vip-center').exists()).toBe(true); 
            expect(wrapper.find('button[aria-label="Delete ticket"]').exists()).toBe(true);
        });
    });
});