import messageHandler from "../MessgeHandler";

export const startTimeout = () => {
  return messageHandler.createMessage('startTimeout')
}

export default startTimeout