import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { encrypt, decrypt } from 'src/crypto/aes'

interface SecretStore {
  secret: string | undefined;
  encryptedSecret: string;
  secretTimer: ReturnType<typeof setTimeout> | null;
}

export const useSecretStore = defineStore('secret', {
  state: () => ({
    secret: undefined,
    encryptedSecret: '',
    // Add a property to store the secret timer ID
    secretTimer: null as ReturnType<typeof setTimeout> | null,
  } as SecretStore),

  actions: {
    setSecret (secret: string) {
      this.secret = secret;
    },

    loadEncryptedSecret () {
      const encryptedSecret = LocalStorage.getItem('secret') as string;
      if (encryptedSecret) {
        this.encryptedSecret = encryptedSecret;
        return true
      }
      return false
    },
    async decryptSecret(pin: string) {
      const { encryptedSecret } = this;
      try {
        const decrypted = await decrypt(encryptedSecret, pin);
        this.secret = decrypted;
      } catch (err) {
        throw new Error('Invalid PIN');
      }
    },

    async encryptSecret(pin: string) {
      const { secret } = this;
      if (!secret) throw new Error('Secret can not be undefined')
      try {
        const encrypted = await encrypt(secret, pin);
        this.encryptedSecret = encrypted;
        localStorage.setItem('secret', encrypted);
      } catch (err) {
        throw new Error('Invalid PIN');
      }
    },

    setSecretTimer() {
      // Clear the existing timer
      if (this.secretTimer) {
        clearTimeout(this.secretTimer);
      }
      // Set a new timer
      this.secretTimer = setTimeout(() => {
        this.secret = undefined;
      }, 30 * 60 * 1000);
    },

    clearUser() {
      this.secret = '';
      this.encryptedSecret = '';
      localStorage.removeItem('secret');
    }

  }
})