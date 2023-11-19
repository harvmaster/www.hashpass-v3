import messageHandler from "../MessgeHandler";

export const unlockSecret = (pin: string): Promise<SuccessMessage> => {
  return messageHandler.createMessage('unlockSecret', {
    pin
  }) as Promise<SuccessMessage>;
}

export default unlockSecret