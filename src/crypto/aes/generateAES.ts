// generate an aes key from a username and password using pbkdf2
import aesKey from "./aesKey"

export const generateAES = async (seed: string): Promise<aesKey> => {
  const password = seed
  const salt = seed
  const iterations = 10000
  const keylen = 32
  const digest = 'sha-512'

  let caller
  try {
    caller = window
  } catch (err) {
    caller = self
  }

  const key = await caller.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )
  const aes = await caller.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new TextEncoder().encode(salt),
      iterations,
      hash: digest
    },
    key,
    { name: 'AES-GCM', length: keylen * 8 },
    false,
    ['encrypt', 'decrypt']
  )
  return new aesKey(aes)
}

export default generateAES
