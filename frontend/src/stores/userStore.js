import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('userData')) || null,
    rol: JSON.parse(localStorage.getItem('userData'))?.rol || 'usuario',
    token: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
      localStorage.setItem('userData', JSON.stringify(userData));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('userData');
    },
    isLoggedIn() {
      return !!this.user;
    }
  }
});
