import messageHandler from "../MessgeHandler";

export const isValidPin = async (pin: string) => {
  return messageHandler.createMessage('isValidPin', {
    pin: pin
  })
}

export default isValidPin