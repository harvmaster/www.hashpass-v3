import { generateAES } from '.'

export const decrypt = async (data: string, key: string) => {
  const aes = await generateAES(key)
  const decrypted = await aes.decrypt(new Uint8Array(Buffer.from(data, 'base64')))
  return decrypted
}

export default decrypt