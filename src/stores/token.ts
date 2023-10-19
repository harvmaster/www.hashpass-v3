import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';
import jwt_decode from "jwt-decode";

export const useTokenStore = defineStore('token', {
  state: () => ({
    refresh_token: '',
    access_token: ''
  }),

  actions: {
    loadAccessToken() {
      const token = LocalStorage.getItem('access_token') as string;
      if (token) {
        this.access_token = token;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true
      }
      return false
    },
    loadRefreshToken() {
      const token = LocalStorage.getItem('refresh_token') as string;
      if (token) {
        this.refresh_token = token;
        return true
      }
      return false
    },
    setAccessToken(token: string) {
      this.access_token = token;
      LocalStorage.set('access_token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    setRefreshToken (refreshToken: string) {
      this.refresh_token = refreshToken;
      LocalStorage.set('refresh_token', refreshToken);
    },
    refreshAccessToken() {
      return api.post('/user/refresh', {
        refresh_token: this.refresh_token
      }).then(res => {
        this.setAccessToken(res.data.access_token);
        return res.data.access_token;
      });
    },
    isAccessExpired() {
      const token = this.access_token;
      if (!token) {
        return true
      }

      const decoded = jwt_decode(token) as any;
      const now = Date.now() / 1000;
      return decoded.exp < now
    },
    clearUser() {
      this.refresh_token = '';
      this.access_token = '';
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
    }
  }
})