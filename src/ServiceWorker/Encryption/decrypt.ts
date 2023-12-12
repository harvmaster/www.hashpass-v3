import messageHandler from "../MessgeHandler";

export const decrypt = (data: string): Promise<DataMessage> => {
  return messageHandler.createMessage('decrypt', { data }) as Promise<DataMessage>;
}

export default decrypt