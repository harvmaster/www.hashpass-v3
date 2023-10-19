export class InvalidPinError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidPinError';
  }
}

export default InvalidPinError