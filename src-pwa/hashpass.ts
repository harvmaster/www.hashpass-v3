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
  setSecret(secret: string): SuccessOrErrorMessage {
    this.#encryptedSecret = secret
    this.#passwords = new Map<string, MemoisedPassword>()
    return {
      type: 'success'
    }
  }

  // unencrypts the secret with the pin using aes
  async unlockSecret(pin: string): Promise<SuccessOrErrorMessage> {
    if (!this.#encryptedSecret) return this.createError('secret is undefined')
    
    try {
      this.#secret = await decrypt(this.#encryptedSecret, pin)
      return {
        type: 'success'
      }
    } catch (err) {
      console.log(err)
      return this.createError('invalid pin')
    }
  }

  lock(): SuccessOrErrorMessage{
    this.#secret = null
    this.#passwords = new Map<string, MemoisedPassword>()
    return {
      type: 'success'
    }
  }

  isValidPin(pin: string): DataOrErrorMessage {
    if (!this.#encryptedSecret) {
      return this.createError('secret in undefined')
    }

    try {
      decrypt(this.#encryptedSecret, pin)
      return {
        type: 'data',
        data: true
      }
    } catch (err) {
      return {
        type: 'data',
        data: false
      }
    }
  }

  isLocked(): DataOrErrorMessage {
    return {
      type: 'data',
      data: this.#secret === null
    }
  }

  generatePassword(service: string, algorithm: string): DataOrErrorMessage {
    if (!this.#secret) return this.createError('secret is undefined')
    if (this.#passwords.has(service)) return { 
      type: 'data',
      data: this.#passwords.get(service)!.password
    }

    const hash = this.getAlgorithm(algorithm)
    if (!hash) return this.createError('invalid algorithm')
    const password = hash(this.#secret, service)
    
    const memo = {
      algorithm,
      password
    }
    this.#passwords.set(service, memo)

    this.#counter++
    if (this.#counter % 10 == 0) console.log(this.#counter)

    return {
      type: 'data',
      data: password
    }
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


  startTimeout(): SuccessOrErrorMessage {
    if (this.#timeout) clearTimeout(this.#timeout);
    this.#timeout = setTimeout(() => {
      this.lock();
    }, 1000 * 60 * 5);
    return {
      type: 'success'
    }
  }

  stopTimeout(): SuccessOrErrorMessage {
    if (this.#timeout) clearTimeout(this.#timeout);
    return {
      type: 'success'
    }
  }

  async decrypt (data: string): Promise<DataOrErrorMessage> {
    if (!this.#secret) return this.createError('secret is undefined')
    return {
      type: 'data',
      data: await decrypt(data, this.#secret)
    }
  }

  async encrypt (data: string): Promise<DataOrErrorMessage>{
    if (!this.#secret) return this.createError('secret is undefined')
    return {
      type: 'data',
      data: await encrypt(data, this.#secret)
    }
  }

  createError (message: any): ErrorMessage {
    return {
      type: 'error',
      error: message
    }
  }
}

export default HashpassSW