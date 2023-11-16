export const messageHandler = (manager: HashManager, message: Message): ResponseMessage | Promise<ResponseMessage> => {

  const success = (): SuccessMessage => ({
    type: 'success'
  })
  const error = (error: any): ErrorMessage => ({
    type: 'error',
    error
  })
  const data = (data: any): DataMessage => ({
    type: 'data',
    data
  })
  
  try {
    switch (message.type) {
      case 'setSecret':
        manager.setSecret(message.params.secret)
        return success()
      case 'unlockSecret':
        manager.unlockSecret(message.params.pin)
         return success()
      case 'lock':
        manager.lock()
        return success()
      case 'generatePassword':
        return data(manager.generatePassword(message.params.service, message.params.algorithm))
      case 'isValidPin':
        return data(manager.isValidPin(message.params.pin))
      case 'isLocked':
        return data(manager.isLocked())
    }
  } catch (err) {
    return error(err)
  }
}

export default messageHandler