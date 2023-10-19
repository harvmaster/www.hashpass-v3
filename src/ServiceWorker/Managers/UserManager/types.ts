import { DuplicateUsernameError, InvalidCredentialsError, ServerError } from './errors';

export type AuthEventTypes = 'login-success' | 'login-error' | 'register-success' | 'register-error'
export type UserEventTypes = 'username-change' | 'settings-change' | 'user-error' | 'user-cleared' | 'user-refreshed'

export type UserInfo = {
  username: string | undefined;
  settings: UserSettings;
}

export type UserSettings = {
  algorithm: 'hp1' | 'hp2' | 'hp3';
}


export type AuthSuccessData = {
  username: string;
  settings: UserSettings;

  access_token: string;
  refesh_token: string;
}

export type AuthErrors = InvalidCredentialsError | ServerError
export type RegisterErrors = AuthErrors | DuplicateUsernameError 

export type LoginSuccess = {
  event: 'login-success';
  data: AuthSuccessData;
}

export type LoginError = {
  event: 'login-error';
  data: AuthErrors
}

export type RegisterSuccess = {
  event: 'register-success';
  data: AuthSuccessData;
}
export type RegisterError = {
  event: 'register-error';
  data: RegisterErrors
}

export type UsernameChange = {
  event: 'username-change';
  data: {
    username: string;
  }
}
export type SettingsChange = {
  event: 'settings-change';
  data: UserSettings;
}

export type UserError = {
  event: 'user-error';
  data: Error;
}

export type UserCleared = {
  event: 'user-cleared';
  data: undefined;
}

export type UserRefreshed = {
  event: 'user-refreshed';
  data: UserInfo;
}

// export type UserEvents = {
//   'username-change': UsernameChange;
//   'settings-change': SettingsChange;
//   'user-error': UserError;
//   'user-cleared': UserCleared;
//   'user-refreshed': UserRefreshed;
// }
// export type AuthEvents = {
//   'login-success': LoginSuccess;
//   'login-error': LoginError;
//   'register-success': RegisterSuccess;
//   'register-error': RegisterError;
// }

export type UserEvents = UsernameChange | SettingsChange | UserError | UserCleared | UserRefreshed
export type AuthEvents = LoginSuccess | LoginError | RegisterSuccess | RegisterError

export type EventTypes = AuthEvents & UserEvents
