import messageHandler from "../MessgeHandler"

export const createLegacyPassword = (service: string): Promise<DataMessage> => {
  return messageHandler.createMessage('generatePassword', {
    service: service,
    algorithm: 'legacy'
  }) as Promise<DataMessage>
}

export default createLegacyPassword