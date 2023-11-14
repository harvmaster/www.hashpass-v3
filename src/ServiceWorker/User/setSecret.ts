import messageHandler from "../MessgeHandler";

export const setSecret = (secret: string) => {
  return messageHandler.createMessage('setSecret', {
    secret: secret
  })
}

export default setSecret