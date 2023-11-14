export const messageHandler = (manager: HashManager, message: Message) => {
  // const capabilities = {
  //   'setSecret': ({ secret }: { secret: string}) => manager.setSecret(secret),
  //   'unlockSecret': ({ pin }: { pin: string}) => manager.unlockSecret(pin),
  //   'lock': () => manager.lock(),
  //   'generatePassword': ({ service, algorithm }: { service: string, algorithm: string}) => manager.generatePassword(service, algorithm),
  //   'isValidPin': ({ pin }: { pin: string}) => manager.isValidPin(pin),
  //   'isLocked': () => manager.isLocked()
  // }

  switch (message.type) {
    case 'setSecret':
      return manager.setSecret(message.params.secret)
    case 'unlockSecret':
      return manager.unlockSecret(message.params.pin)
    case 'lock':
      return manager.lock()
    case 'generatePassword':
      return manager.generatePassword(message.params.service, message.params.algorithm)
    case 'isValidPin':
      return manager.isValidPin(message.params.pin)
    case 'isLocked':
      return manager.isLocked()
  }
}

export default messageHandler