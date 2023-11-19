import messageHandler from "../MessgeHandler";

export const isValidPin = async (pin: string): Promise<DataMessage> => {
  return messageHandler.createMessage('isValidPin', {
    pin: pin
  }) as Promise<DataMessage>
}

export default isValidPin