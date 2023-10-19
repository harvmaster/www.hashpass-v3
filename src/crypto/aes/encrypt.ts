import { generateAES } from '.'

export const encrypt = async (data: string, key: string) => {
  const aes = await generateAES(key)
  const encrypted = await aes.encrypt(data)
  return Buffer.from(encrypted).toString('base64')
}

export default encrypt