import messageHandler from "../MessgeHandler"

export const createHexPassword = (service: string): Promise<DataMessage> => {
  return messageHandler.createMessage('generatePassword', {
    service: service,
    algorithm: 'hex'
  }) as Promise<DataMessage>
}

export default createHexPassword