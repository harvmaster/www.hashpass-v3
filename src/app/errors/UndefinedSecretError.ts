export class UndefinedSecretError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UndefinedSecretError';
  }
}

export default UndefinedSecretError