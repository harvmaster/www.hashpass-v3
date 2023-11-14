import messageHandler from "../MessgeHandler"

export const createLegacyPassword = (service: string) => {
  return messageHandler.createMessage('generatePassword', {
    service: service,
    algorithm: 'legacy'
  })
}

export default createLegacyPassword