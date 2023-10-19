export class UndefinedRefreshTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UndefinedRefreshTokenError';
  }
}

export default UndefinedRefreshTokenError;