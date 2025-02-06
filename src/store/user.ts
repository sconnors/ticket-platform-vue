import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        loggedIn: false,
        loading: false,
    }),
    getters: {
        getLoggedIn: (state) => state.loggedIn,
        getLoading: (state) => state.loading,
    },
    actions: {
        async logIn () {
            if (this.loading) return;

            try {
                this.loading = true;
                
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.loggedIn = true;
                
            } catch (error) {
                // catch error
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        async logOut () {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); 

                this.loggedIn = false;

            } catch (error) {
                console.log(error)
            }
        }  
    }
});