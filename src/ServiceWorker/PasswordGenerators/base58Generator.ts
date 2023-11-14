import messageHandler from "../MessgeHandler"

export const createBase58Password = (service: string) => {
  return messageHandler.createMessage('generatePassword', {
    service: service,
    algorithm: 'base58'
  })
}

export default createBase58Password