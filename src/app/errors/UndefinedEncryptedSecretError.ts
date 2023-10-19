export class UndefinedEncryptedSecretError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UndefinedEncryptedSecretError';
  }
}

export default UndefinedEncryptedSecretError