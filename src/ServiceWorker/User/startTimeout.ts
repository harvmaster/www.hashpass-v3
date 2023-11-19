import messageHandler from "../MessgeHandler";

export const startTimeout = (): Promise<SuccessMessage> => {
  return messageHandler.createMessage('startTimeout') as Promise<SuccessMessage>;
}

export default startTimeout