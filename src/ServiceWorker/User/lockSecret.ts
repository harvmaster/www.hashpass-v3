import messageHandler from "../MessgeHandler";

export const lockSecret = (): Promise<SuccessMessage> => {
  return messageHandler.createMessage('lock') as Promise<SuccessMessage>;
}

export default lockSecret