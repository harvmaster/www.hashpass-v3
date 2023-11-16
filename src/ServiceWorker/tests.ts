import { createBase58Password, createHexPassword, createLegacyPassword } from './PasswordGenerators'
import { setSecret, unlockSecret, isLocked, isValidPin, startTimeout, stopTimeout } from './User'
import { encrypt, decrypt } from 'src/crypto/aes';

import { Notify } from 'quasar';

const generateRandomString = () => {
  const length = 12
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
const services = new Array(10).fill(0).map(() => generateRandomString())

export const testPasswordGenerators = async (iterations = 10) => {
  console.log('Testing password generators...')
  
  try {
    const lStart = performance.now()
    console.log('--------------Legacy--------------')
    console.time('legacy Generator')
    const legacyPasswords = services.map(service => createLegacyPassword(service))
    await Promise.all(legacyPasswords)
    console.timeEnd('legacy Generator')
    const lEnd = performance.now()
  
    const hStart = performance.now()
    console.log('--------------Hex--------------')
    console.time('hex Generator')
    const hexPasswords = services.map(service => createHexPassword(service))
    await Promise.all(hexPasswords)
    console.timeEnd('hex Generator')
    const hEnd = performance.now()
  
    const bStart = performance.now()
    console.log('--------------Base58--------------')
    console.time('base58 Generator')
    const base58Passwords = services.map(service => createBase58Password(service))
    await Promise.all(base58Passwords)
    console.timeEnd('base58 Generator')
    const bEnd = performance.now()

    return {
      legacy: lEnd - lStart,
      hex: hEnd - hStart,
      base58: bEnd - bStart
    }
  } catch (err) {
    console.log(err)
    console.timeEnd('legacy Generator')
    console.timeEnd('hex Generator')
    console.timeEnd('base58 Generator')
  }
}

export const testSetSecret = async (pin = '1234') => {
  console.log('Testing setSecret...')
  const secret = await encrypt('test', pin)
  try {
    await setSecret(secret)
    console.log('setSecret passed')
  } catch (err) {
    console.log(err)
    console.log('setSecret failed')
  }
}

export const testUnlockSecret = async (pin = '1234') => {
  console.log('Testing unlockSecret...')
  try {
    await unlockSecret(pin)
    console.log('unlockSecret passed')
  } catch (err) {
    console.log(err)
    console.log('unlockSecret failed')
  }
}

export const testIsLocked = async () => {
  console.log('Testing isLocked...')
  try {
    const locked = await isLocked()
    if (!locked) throw new Error('isLocked failed')
    console.log('isLocked passed')
  } catch (err) {
    console.log(err)
    console.log('isLocked failed')
  }
}

export const testIsValidPin = async (pin = '1234') => {
  console.log('Testing isValidPin...')
  try {
    const valid = await isValidPin(pin)
    if (!valid) throw new Error('isValidPin failed')
    if (valid.data !== true) throw new Error('isValidPin: Wrong Pin')
    console.log('isValidPin passed')
  } catch (err) {
    console.log(err)
    console.log('isValidPin failed')
  }
}

export const testIsInvalidPin = async (pin = '4321') => {
  console.log('Testing isInvalidPin...')
  try {
    const valid = await isValidPin(pin)
    if (!valid) throw new Error('isInvalidPin failed')
    if (valid.data !== false) throw new Error('isInvalidPin: Pin returned as valid')
    console.log('isInvalidPin passed')
  } catch (err) {
    console.log(err)
    console.log('isInvalidPin failed')
  }
}

export const testStartTimeout = async () => {
  console.log('Testing startTimeout...')
  try {
    await startTimeout()
    console.log('startTimeout passed')
  } catch (err) {
    console.log(err)
    console.log('startTimeout failed')
  }
}

export const testStopTimeout = async () => {
  console.log('Testing stopTimeout...')
  try {
    await stopTimeout()
    console.log('stopTimeout passed')
  } catch (err) {
    console.log(err)
    console.log('stopTimeout failed')
  }
}

export const testAll = async () => {
  await testPasswordGenerators()
  await testSetSecret()
  await testUnlockSecret()
  await testIsLocked()
  await testIsValidPin()
  await testStartTimeout()
  await testStopTimeout()
}