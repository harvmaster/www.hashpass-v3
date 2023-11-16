interface HashManager {
  setSecret(secret: string): void;
  unlockSecret(pin: string): Promise<void>;
  lock(): void;
  isValidPin(pin: string): Promise<boolean>;
  isLocked(): boolean;
  generatePassword(service: string, algorithm: string): string;
  startTimeout(): void;
  stopTimeout(): void;
  decrypt(data: string): Promise<string>;
  encrypt(data: string): Promise<string>;
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

interface StartTimeoutMessage {
  type: 'startTimeout'
}

interface StopTimeoutMessage {
  type: 'stopTimeout'
}

type Message = SetSecretMessage | UnlockSecretMessage | LockMessage | GeneratePasswordMessage | IsValidPinMessage | IsLockedMessage | StartTimeoutMessage | StopTimeoutMessage

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