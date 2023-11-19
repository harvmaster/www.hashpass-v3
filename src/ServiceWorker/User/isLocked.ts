import messageHandler from "../MessgeHandler";

export const isLocked = (): Promise<DataMessage> => {
  return messageHandler.createMessage('isLocked') as Promise<DataMessage>;
}

export default isLocked