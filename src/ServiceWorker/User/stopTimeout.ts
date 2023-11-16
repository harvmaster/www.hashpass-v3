import messageHandler from "../MessgeHandler";

export const stopTimeout = () => {
  return messageHandler.createMessage('stopTimeout')
}

export default stopTimeout