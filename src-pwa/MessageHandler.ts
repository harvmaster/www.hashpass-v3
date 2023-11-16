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
        return manager.unlockSecret(message.params.pin).then(success, error)
      case 'lock':
        manager.lock()
        return success()
      case 'generatePassword':
        return data(manager.generatePassword(message.params.service, message.params.algorithm))
      case 'isValidPin':
        return manager.isValidPin(message.params.pin).then(data, error)
      case 'isLocked':
        return data(manager.isLocked())
      case 'startTimeout':
        manager.startTimeout()
        return success()
      case 'stopTimeout':
        manager.stopTimeout()
        return success()
    }
  } catch (err) {
    return error(err)
  }
}

export default messageHandler