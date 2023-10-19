import { defineStore,  } from 'pinia';
import { LocalStorage } from 'quasar';

import { api } from 'boot/axios';

import { useSecretStore } from './secret'
import { useTokenStore } from './token'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    settings: {
      algorithm: 'hp2'
    }
  }),

  actions: {
    initializeUser () {
      this.username = LocalStorage.getItem('username') || this.username;
      this.settings = LocalStorage.getItem('settings') || this.settings;
    },

    setUser ({ username, settings }: { username: string; settings: any }) {
      this.username = username;
      this.settings = settings;
      LocalStorage.set('username', username);
      LocalStorage.set('settings', settings);
    },

    clearUser() {
      this.username = '';
      this.settings = {
        algorithm: 'hp2'
      };
      localStorage.removeItem('username');
      localStorage.removeItem('settings');

      const secretStore = useSecretStore()
      secretStore.clearUser();

      const tokenStore = useTokenStore()
      tokenStore.clearUser();
    },

    async refreshUserData () {
      const { data } = await api.get('/user');
      this.setUser(data)
    },

    async saveSettings () {
      const { data } = await api.post('/user/settings', this.settings);
      this.settings = data.settings
      LocalStorage.set('settings', data.settings);
    }
  },

  
});