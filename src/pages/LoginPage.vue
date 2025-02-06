<script setup lang="ts">
    import { Button, IftaLabel, InputText }  from 'primevue';
    import { Form, type FormSubmitEvent } from '@primevue/forms';
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/store';
    import type { Error, GenericValue } from '@/utils/types';

    const router = useRouter();
    const userStore =  useUserStore();

    const initialValues = ref({
        username: '',
        passowrd: ''
    });


    const loading = computed(() => userStore.getLoading);

    const resolver = ({ values }: { values: GenericValue } ) => {
        const errors: Error = {
            username: [],
            password: []
        };

        if (!values.username) {
            errors.username = [{ message: 'Username is required.' }];
        }

        if (!values.password) {
            errors.password = [{ message: 'Password is required.' }];
        }

        return { errors };
    };


    const login = async (evt: FormSubmitEvent) => {
        if(!evt.valid) return;

        const redirect = router.currentRoute.value.query.redirect || '/';

        try {
            await userStore.logIn(); 
            router.push(redirect as string); 
        
        } catch (error) {
            console.error('Error Logging in:', error);
        }  
    }
</script>

<template>
    <section class="flex flex-col justify-center items-center h-full">
        <h1 class="text-3xl lg:text-4xl mb-2">Welcome Back</h1>
        <p class="text-xl text-center mb-12">Log in to access your account and explore exclusive content.</p>

        <Form v-slot="$form" :initialValues :resolver @submit="login" class="p-8 border border-[#cbd5e1] w-full rounded-md sm:w-96">

            <div class="flex flex-col justify-center items-center gap-4 ">
                <IftaLabel class="w-full">
                    <InputText id="username" name="username" class="w-full" />
                    <label for="username">Username</label>
                    <p v-if="$form.username?.invalid" class="text-xs text-[#dc2626] mt-1"> 
                        {{  $form.username.error?.message }} 
                    </p> 
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText type="password" id="password" name="password"  class="w-full" />
                    <label for="password">Password</label>
                    <p v-if="$form.password?.invalid" class="text-xs text-[#dc2626] mt-1"> 
                        {{ $form.password.error?.message }} 
                    </p> 
                </IftaLabel>

                <Button type="submit" label="Submit" :loading="loading" severity="success" class="w-full" />
            </div>
        </Form>
    </section>
</template>

  
