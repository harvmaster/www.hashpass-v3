import messageHandler from "../MessgeHandler"

export const createBase58Password = (service: string): Promise<DataMessage> => {
  return messageHandler.createMessage('generatePassword', {
    service: service,
    algorithm: 'base58'
  }) as Promise<DataMessage>
}

export default createBase58Password