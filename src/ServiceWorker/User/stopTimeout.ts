import messageHandler from "../MessgeHandler";

export const stopTimeout = (): Promise<SuccessMessage> => {
  return messageHandler.createMessage('stopTimeout') as Promise<SuccessMessage>;
}

export default stopTimeout