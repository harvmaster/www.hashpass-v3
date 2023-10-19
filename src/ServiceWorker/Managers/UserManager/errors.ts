export class InvalidCredentialsError extends Error {
    name = 'Invalid Credentials';
  }
  
  export class MalformedCredentialsError extends Error {
    name = 'Malformed Credentials';
  }
  
  export class DuplicateUsernameError extends Error {
    name = 'Duplicate Username';
  }
  
  export class InvalidAlgorithmError extends Error {
    name = 'Invalid Algorithm';
  }
  
  export class InvalidTypeError extends Error {
    name = 'Invalid Type';
  }

  export class InvalidAccessToken extends Error {
    name = 'Invalid Access Token';
  }
  
  export class ServerError extends Error {
    name = 'Server Error';
  }
  
  export type AuthErrors = InvalidCredentialsError | ServerError | MalformedCredentialsError;
  export type RegisterErrors = AuthErrors | DuplicateUsernameError;