import messageHandler from "../MessgeHandler";

export const setSecret = (secret: string): Promise<SuccessMessage> => {
  return messageHandler.createMessage('setSecret', {
    secret: secret
  }) as Promise<SuccessMessage>;
}

export default setSecret