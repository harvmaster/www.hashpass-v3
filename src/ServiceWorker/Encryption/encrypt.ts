import messageHandler from "../MessgeHandler";

export const encrypt = (data: string): Promise<DataMessage> => {
  return messageHandler.createMessage('encrypt', { data }) as Promise<DataMessage>;
}

export default encrypt