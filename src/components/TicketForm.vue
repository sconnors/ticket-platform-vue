<script setup lang="ts">
    import { Button, Checkbox, IftaLabel, InputNumber, InputText, Textarea } from 'primevue';
    import { Form, type FormSubmitEvent } from '@primevue/forms';
    import { ref } from 'vue';
    import { useTicketStore } from '@/store/tickets';
    import type { Error, GenericValue } from '@/utils/types';
    

    const ticketStore = useTicketStore();

    const defaultTicket = ref({
        id: '',
        name: '',
        description: '',
        isVIP: false,
        count: 1,
        price: 0,
        amount: 0,
    });

    const ticketForm = ref({...defaultTicket.value });

    const createTicket = async ({ valid }: FormSubmitEvent) => {
        if (!valid) return;

        try {
            await ticketStore.addTicket(ticketForm.value); 
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            ticketForm.value = {...defaultTicket.value}; 
        }
    }

    const resolver = ({ values }: { values: GenericValue }) => {
        const errors: Error = {
            name: [],
            description: []
        };

        if (!values.name) {
            errors.name = [{ message: 'Ticket Name is required.' }];
        }

        if (!values.description) {
            errors.description = [{ message: 'Description is required.' }];
        }

        return { errors };
    };

</script>

<template>
    <Form v-slot="$form" :defaultTicket :resolver @submit="createTicket" class="w-full">
        <div class="flex flex-col justify-center items-center gap-4">
            <IftaLabel class="w-full">
                <label htmlFor="name">Ticket Name:</label>
                <InputText id="name" name="name" type="text" v-model="ticketForm.name"  class="w-full" />
                <p v-if="$form.name?.invalid" class="text-xs text-[#dc2626] mt-1"> 
                    {{ $form.name.error?.message }} 
                </p> 
            </IftaLabel>

            <IftaLabel class="w-full">
                <label htmlFor="description">Description:</label>
                <Textarea id="description" name="description" v-model="ticketForm.description"  class="w-full" />
                <p v-if="$form.description?.invalid" class="text-xs text-[#dc2626] mt-1"> 
                    {{ $form.description.error?.message }} 
                </p>                 
            </IftaLabel>

            <IftaLabel class="w-full">
                <InputNumber inputId="count" name="count" v-model="ticketForm.count" showButtons :min="1" :max="100" class="w-full" />
                <label htmlFor="count">Count: (number of tickets available)</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <InputNumber inputId="price" name="price" v-model="ticketForm.price" showButtons mode="currency" currency="USD" class="w-full" />
                <label htmlFor="price">Price:</label>
            </IftaLabel>                

            <div class="flex justify-center items-center gap-2">
                <label htmlFor="isVIP" class="label">VIP:</label>
                <Checkbox inputId="isVIP" name="isVIP" v-model="ticketForm.isVIP" binary  class="w-full" />
            </div>                

            <Button type="submit" label="Create Ticket" :loading="ticketStore.getLoading" severity="success" class="w-full" />
        </div>
    </Form>
</template>

<style scoped>

    .label {
        transition-property: all;
        transition-timing-function: ease;
        line-height: 1;
        font-size: var(--p-iftalabel-font-size);
        font-weight: var(--p-iftalabel-font-weight);
        inset-inline-start: var(--p-iftalabel-position-x);
        color: var(--p-iftalabel-color);
        transition-duration: var(--p-iftalabel-transition-duration);
    }

</style>