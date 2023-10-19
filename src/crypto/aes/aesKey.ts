export class aesKey {
  key: CryptoKey;
  
  constructor(key: CryptoKey) {
    this.key = key
  }

  async encrypt(data: string) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      this.key,
      new TextEncoder().encode(data)
    )
    const encryptedArray = new Uint8Array(encrypted)
    const combined = new Uint8Array(iv.length + encryptedArray.length)
    combined.set(iv)
    combined.set(encryptedArray, iv.length)
    return combined
  }

  async decrypt(data: Uint8Array) {
    const iv = data.slice(0, 12)
    const encrypted = data.slice(12)
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      this.key,
      encrypted
    )
    return new TextDecoder().decode(decrypted)
  }
}

export default aesKey