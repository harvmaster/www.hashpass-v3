import { LocalStorage } from "quasar";

import EventEmitter from "../EventEmitter";
import { InvalidAlgorithmError, InvalidPinError, UndefinedEncryptedSecretError, UndefinedSecretError } from "../errors";

import * as passwordGenerators from 'src/crypto/passwordGenerators'
import { decrypt, encrypt } from "src/crypto/aes";

export interface PasswordManagerInterface {
  encryptedSecret: string | undefined;
  secret: string | undefined;

  initializePasswordManager: () => boolean;
  hasSecret: () => boolean;
  decryptSecret: (pin: string) => Promise<void>;
  encryptSecret: (pin: string) => Promise<void>;

  generatePassword: (service: string, masterPassword: string) => string | undefined;

  encrypt: (secret: string) => Promise<string>;
  decrypt: (encryptedSecret: string) => Promise<string>;

  on: (event: 'secret-decrypted', listener: () => void) => void;
}

export class PasswordManager extends EventEmitter implements PasswordManagerInterface {
  encryptedSecret: string | undefined;
  #secret: string | undefined;

  constructor() {
    super()
    this.encryptedSecret = undefined
    this.#secret = undefined
  }

  initializePasswordManager() {
    this.encryptedSecret = LocalStorage.getItem('encryptedSecret') as string || this.encryptedSecret;
    return this.encryptedSecret !== undefined
  }

  async decryptSecret(pin: string) {
    if (!this.encryptedSecret) throw new UndefinedEncryptedSecretError('Encrypted secret can not be undefined')
    try {
      const decrypted = await decrypt(this.encryptedSecret, pin);
      this.#secret = decrypted;
      this.emit('secret-decrypted', null)
    } catch (err) {
      throw new InvalidPinError('Invalid PIN');
    }
  }

  async encryptSecret(pin: string) {
    if (!this.#secret) throw new UndefinedSecretError('Secret can not be undefined')
    try {
      const encrypted = await encrypt(this.#secret, pin);
      this.encryptedSecret = encrypted;
      localStorage.setItem('encryptedSecret', encrypted);
    } catch (err) {
      throw err
    }
  }

  set secret(secret: string | undefined) {
    this.#secret = secret
  }
  get secret() {
    return undefined
  }

  hasSecret() {
    return this.#secret !== undefined
  }

  generatePassword(service: string, algorithm: string) {
    if (!passwordGenerators.algorithms.includes(algorithm)) {
      throw new InvalidAlgorithmError('Invalid algorithm: ' + algorithm)
    }
    if (!this.#secret) throw new UndefinedSecretError('Secret can not be undefined')

    switch (algorithm) {
      case 'hp1':
        return passwordGenerators.hp1(service, this.#secret)
      case 'hp2':
        return passwordGenerators.hp2(service, this.#secret)
      case 'hp3':
        return passwordGenerators.hp3(service, this.#secret)
    }
  }

  async encrypt (data: any) {
    if (!this.#secret) throw new UndefinedSecretError('Secret can not be undefined')
    const encrypted = await encrypt(data, this.#secret)
    return encrypted
  }

  async decrypt (encryptedData: any) {
    if (!this.#secret) throw new UndefinedSecretError('Secret can not be undefined')
    const decrypted = await decrypt(encryptedData, this.#secret)
    return decrypted
  }

  clear() {
    this.encryptedSecret = undefined
    this.#secret = undefined
    localStorage.removeItem('encryptedSecret')
  }

}

export default PasswordManager