import messageHandler from "../MessgeHandler";

export const isLocked = () => {
  return messageHandler.createMessage('isLocked')
}

export default isLocked