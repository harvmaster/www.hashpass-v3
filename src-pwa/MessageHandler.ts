export const messageHandler = async (manager: HashManager, message: Message): Promise<ResponseMessage> => {

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
        return await manager.unlockSecret(message.params.pin).then(success, error)
      case 'lock':
        manager.lock()
        return success()
      case 'generatePassword':
        return data(manager.generatePassword(message.params.service, message.params.algorithm))
      case 'isValidPin':
        return await manager.isValidPin(message.params.pin).then(data, error)
      case 'isLocked':
        return await data(manager.isLocked())
      case 'startTimeout':
        manager.startTimeout()
        return success()
      case 'stopTimeout':
        manager.stopTimeout()
        return success()
      case 'encrypt':
        return await manager.encrypt(message.params.data).then(data, error)
      case 'decrypt':
        return await manager.decrypt(message.params.data).then(data, error)
    }
  } catch (err) {
    return error(err)
  }
}

export default messageHandler