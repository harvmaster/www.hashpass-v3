import messageHandler from "../MessgeHandler"

export const createHexPassword = (service: string) => {
  return messageHandler.createMessage('generatePassword', {
    service: service,
    algorithm: 'hex'
  })
}

export default createHexPassword