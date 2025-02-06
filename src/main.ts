import './style.css';
import "primeicons/primeicons.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';

import PrimeVue from 'primevue/config';
import { App } from '@/pages';
import Aura from '@primevue/themes/aura';

const pinia = createPinia();


createApp(App)
    .use(pinia)
    .use(PrimeVue, { theme: { preset: Aura }})
    .use(router)
    .mount('#app')
