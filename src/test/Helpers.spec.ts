import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/utils/helpers';


describe('Helper functions', () => {
    describe('formatCurrency ', () => {

        it('should return a value with a $ sign', async () => {
            const format = formatCurrency(10);
            expect(format).toBe('$10.00');
        });
    });
});