export class InvalidAlgorithmError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidAlgorithmError';
  }
}

export default InvalidAlgorithmError