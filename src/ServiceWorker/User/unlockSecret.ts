import messageHandler from "../MessgeHandler";

export const unlockSecret = (pin: string) => {
  return messageHandler.createMessage('unlockSecret', {
    pin
  })
}

export default unlockSecret