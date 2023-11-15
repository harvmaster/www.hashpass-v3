interface HashManager {
  setSecret(secret: string): SuccessOrErrorMessage;
  unlockSecret(pin: string): Promise<SuccessOrErrorMessage>;
  lock(): SuccessOrErrorMessage;
  isValidPin(pin: string): DataOrErrorMessage;
  isLocked(): DataOrErrorMessage;
  generatePassword(service: string, algorithm: string): DataOrErrorMessage;
  startTimeout(): SuccessOrErrorMessage;
  stopTimeout(): SuccessOrErrorMessage;
  decrypt(data: string): Promise<DataOrErrorMessage>;
  encrypt(data: string): Promise<DataOrErrorMessage>;
}

interface SetSecretMessage {
  type: 'setSecret'
  params: {
    secret: string
  }
}

interface UnlockSecretMessage {
  type: 'unlockSecret'
  params: {
    pin: string
  }
}

interface LockMessage {
  type: 'lock'
}

interface GeneratePasswordMessage {
  type: 'generatePassword'
  params: {
    service: string
    algorithm: string
  }
}

interface IsValidPinMessage {
  type: 'isValidPin'
  params: {
    pin: string
  }
}

interface IsLockedMessage {
  type: 'isLocked'
}

type Message = SetSecretMessage | UnlockSecretMessage | LockMessage | GeneratePasswordMessage | IsValidPinMessage | IsLockedMessage

interface ErrorMessage {
  type: 'error'
  error: any
}

interface SuccessMessage {
  type: 'success'
}

interface DataMessage {
  type: 'data'
  data: any
}

type SuccessOrErrorMessage = ErrorMessage | SuccessMessage
type DataOrErrorMessage = ErrorMessage | DataMessage

type ResponseMessage = ErrorMessage | SuccessMessage | DataMessage