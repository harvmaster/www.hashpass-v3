import { hp1, hp2, hp3, algorithms } from 'src/crypto/passwordGenerators'
import { encrypt, decrypt } from 'src/crypto/aes'

interface MemoisedPassword {
  algorithm: string;
  password: string;
}

class HashpassSW {
  #encryptedSecret?: string
  #secret?: string | null
  #passwords: Map<string, MemoisedPassword>
  #timeout?: NodeJS.Timeout

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
      throw new Error('invalid pin')
    }
  }

  lock() {
    this.#secret = null
    this.#passwords = new Map<string, MemoisedPassword>()
  }

  isValidPin(pin: string) {
    if (!this.#encryptedSecret) {
      throw new Error('secret in undefined')
    }

    try {
      decrypt(this.#encryptedSecret, pin)
      return true
    } catch (err) {
      return false
    }
  }

  isLocked() {
    return this.#secret === null
  }

  async generatePassword(service: string, algorithm: string){
    if (!this.#secret) throw new Error('secret is undefined')
    if (this.#passwords.has(service)) return this.#passwords.get(service)?.password

    const hash = this.getAlgorithm(algorithm)
    const password = await hash(this.#secret, service)
    
    const memo = {
      algorithm,
      password
    }
    this.#passwords.set(service, memo)

    return password
  }

  getAlgorithm (algorithm: string) {
    if (!algorithms.includes(algorithm)) throw new Error('invalid algorithm')
    const algorithmTable: {[key: string]: (secret: string, service: string) => string} = {
      'hp1': hp1,
      'hp2': hp2,
      'hp3': hp3
    }
    return algorithmTable[algorithm]
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

  decrypt (data: string) {
    if (!this.#secret) throw new Error('secret is undefined')
    return decrypt(data, this.#secret)
  }

  encrypt (data: string) {
    if (!this.#secret) throw new Error('secret is undefined')
    return encrypt(data, this.#secret)
  }
}

export default HashpassSW