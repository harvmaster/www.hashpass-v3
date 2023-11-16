import { hp1, hp2, hp3, algorithms } from 'src/crypto/passwordGenerators'
import { encrypt, decrypt } from 'src/crypto/aes'

interface MemoisedPassword {
  algorithm: string;
  password: string;
}

class HashpassSW implements HashManager {
  #encryptedSecret?: string
  #secret?: string | null
  #passwords: Map<string, MemoisedPassword>
  #timeout?: NodeJS.Timeout
  #counter = 0

  constructor() {
    this.#passwords = new Map<string, MemoisedPassword>()
  }

  // Takes in an encrypted string that is the secret
  setSecret(secret: string) {
    this.#encryptedSecret = secret
    this.#passwords = new Map<string, MemoisedPassword>()
  }

  // unencrypts the secret with the pin using aes
  async unlockSecret(pin: string) {
    if (!this.#encryptedSecret) throw new Error('secret is undefined')
    
    try {
      this.#secret = await decrypt(this.#encryptedSecret, pin)
    } catch (err) {
      console.log(err)
      throw new Error('invalid pin')
    }
  }

  lock() {
    this.#secret = null
    this.#passwords = new Map<string, MemoisedPassword>()
  }

  async isValidPin(pin: string): Promise<boolean> {
    if (!this.#encryptedSecret) {
      throw new Error('secret in undefined')
    }

    try {
      await decrypt(this.#encryptedSecret, pin)
      return true
    } catch (err) {
      return false
    }
  }

  isLocked(): boolean {
    return this.#secret === null
  }

  generatePassword(service: string, algorithm: string): string {
    if (!this.#secret) throw new Error('secret is undefined')
    if (this.#passwords.has(service)) return this.#passwords.get(service)!.password

    const hash = this.getAlgorithm(algorithm)
    if (!hash) throw new Error('invalid algorithm')
    const password = hash(this.#secret, service)
    
    const memo = {
      algorithm,
      password
    }
    this.#passwords.set(service, memo)

    this.#counter++
    if (this.#counter % 10 == 0) console.log(this.#counter)

    return password
  }

  getAlgorithm (algorithm: string) {
    if (!algorithms.includes(algorithm)) return null
    const algorithmTable: {[key: string]: (secret: string, service: string) => string} = {
      'legacy': hp1,
      'hex': hp2,
      'base58': hp3
    }
    return algorithmTable[algorithm] || hp3
  }


  startTimeout() {
    if (this.#timeout) clearTimeout(this.#timeout);
    this.#timeout = setTimeout(() => {
      this.lock();
    }, 1000 * 60 * 5);
  }

  stopTimeout() {
    if (this.#timeout) clearTimeout(this.#timeout);
  }

  async decrypt (data: string): Promise<string> {
    if (!this.#secret) throw new Error('secret is undefined')
    return decrypt(data, this.#secret)
  }

  async encrypt (data: string): Promise<string>{
    if (!this.#secret) throw new Error('secret is undefined')
    return encrypt(data, this.#secret)
  }
}

export default HashpassSW