import { createRouter, createWebHistory } from 'vue-router';
import { Admin, Home, Login, NotFound, ShoppingCart } from '@/pages';
import { useUserStore } from '@/store';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/cart',
        name: 'cart',
        component: ShoppingCart,
    },
    {
        path: '/:pathMatch(.*)*', 
        name: 'notfound',
        component: NotFound, 
      },]
})

router.beforeEach( (to, from, next) => {
    const userStore =  useUserStore();

    if (to.meta.requiresAuth && !userStore.getLoggedIn) { 
        next({ path: '/login', query: { redirect: to.fullPath } }); 
    } else {
        next();
    }
})



export default router;