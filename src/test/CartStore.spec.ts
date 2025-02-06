import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore } from '@/store';
import { createPinia, setActivePinia } from 'pinia';

describe('Cart Store', () => {

    beforeEach(() => {
        setActivePinia(createPinia()); 
    });

    it('Add items to cart, check total items and price total', async () => {

        const mockFetch = vi.fn().mockResolvedValueOnce({ 
            json: () => Promise.resolve([{ id: 1, name: 'Item 1' }]) 
        });
        global.fetch = mockFetch;

        const store = useCartStore(); 

        await store.addToCart({   
            id: '1',
            name: 'Concert Ticket',
            description: 'General Admission',
            price: 120,
            isVIP: false,
            count: 1,
            amount: 10 
        }); 

        expect(store.getItemsTotal).toBe(10);  
        expect(store.getPriceTotal).toBe(1200);  
    });
});