interface HashManager {
  setSecret(secret: string): void;
  unlockSecret(pin: string): Promise<void>;
  lock(): void;
  isValidPin(pin: string): boolean;
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

type Message = SetSecretMessage | UnlockSecretMessage | LockMessage | GeneratePasswordMessage | IsValidPinMessage | IsLockedMessage