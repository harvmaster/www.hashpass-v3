import { LocalStorage } from 'quasar';
import { AxiosError } from 'axios';
import { api } from 'src/boot/axios';

import EventEmitter from '../../EventEmitter'
import { algorithms } from 'src/crypto/passwordGenerators';

import { UserInfo, UserSettings, UserEvents, AuthSuccessData, UserEventTypes, AuthEvents } from './types'
import { DuplicateUsernameError, InvalidAccessToken, InvalidAlgorithmError, InvalidCredentialsError, InvalidTypeError, MalformedCredentialsError, ServerError } from './errors';


export class UserManager extends EventEmitter<UserEvents | AuthEvents> {
  private _username: string | undefined;
  private _settings: UserSettings;

  constructor() {
    super();
    this._settings = {
      algorithm: 'hp3'
    }
  }
  
  set username(username: string | undefined) {
    if (typeof username !== 'string') {
      this.emit('user-error', new Error('Invalid username: username must be a string') as InvalidTypeError)
      return;
    }
  
    this._username = username
    this.emit('username-change', { username })
  }

  get username(): string | undefined {
    return this._username;
  }

  set settings(settings: UserSettings) {
    if (typeof settings.algorithm !== 'string') {
      this.emit('user-error', new Error('Invalid algorithm: algorithm must be a string') as InvalidTypeError)
      return;
    }
    if (!algorithms.includes(settings.algorithm)) {
      this.emit('user-error', new Error('Invalid algorithm: ' + settings.algorithm + ' is not a valid algorithm') as InvalidAlgorithmError)
      return;
    }
  
    this._settings = settings;
    this.emit('settings-change', settings)
  }

  get settings(): UserSettings {
    return this._settings;
  }

  initialize(): boolean {
    this.username = LocalStorage.getItem('username') as string || this.username;
    this.settings = LocalStorage.getItem('settings') || this.settings;

    if (!algorithms.includes(this.settings.algorithm)) {
      this.settings.algorithm = 'hp3';
      LocalStorage.set('settings', this.settings);
    }

    this.emit('user-refreshed', { username: this.username, settings: this.settings })

    return this.username !== undefined
  }

  setUser({ username, settings }: UserInfo): void {
    this.username = username
    this.settings = settings

    LocalStorage.set('username', username)
    LocalStorage.set('settings', settings)

    this.emit('user-refreshed', { username, settings })
  }

  clearUser(): void {
    this.username = undefined;
    this.settings = {
      algorithm: 'hp3'
    }
    
    this.emit('user-cleared', undefined)
  }

  async register({ username, password }: { username: string, password: string }): Promise<void> {
    try {
      const response = await api.post('/user', {
        username,
        password
      })

      const data = response.data as AuthSuccessData
      this.setUser(data)

      this.emit('register-success', data)
    } catch (err: unknown) {
      if (!(err instanceof AxiosError)) {
        this.emit('register-error', err as Error)
        return;
      }

      switch (err.response?.status) {
        case 400:
          const errorMessage = err.response.data.error ?? 'Invalid username or password'
          this.emit('register-error', new MalformedCredentialsError(errorMessage))
          break;
        case 409:
          this.emit('register-error', new DuplicateUsernameError('Username already exists'))
          break;
        case 500:
          this.emit('register-error', new ServerError('Internal Server Error'))
          break;
        default:
          this.emit('register-error', err)
          break;
      }
    } 
  }

  async login({ username, password }: { username: string, password: string }): Promise<void> {
    try {
      const response = await api.post('/user/login', {
        username,
        password
      })

      const data = response.data as AuthSuccessData
      this.setUser(data)

      this.emit('login-success', data)
    } catch (err: unknown) {
      if (!(err instanceof AxiosError)) {
        this.emit('login-error', err as Error)
        return;
      }

      switch (err.response?.status) {
        case 400:
          this.emit('login-error', new MalformedCredentialsError('Missing username or password'))
          break;
        case 401:
          this.emit('login-error', new InvalidCredentialsError('Invalid username or password'))
          break;
        case 500:
          this.emit('login-error', new ServerError('Internal Server Error'))
          break;
        default:
          this.emit('login-error', err)
          break;
      }
    } 
  }

  async refreshUser(): Promise<void> {
    try {
      const response = await api.get('/user')

      const data = response.data as UserInfo
      this.setUser(data)

      this.emit('user-refreshed', data)
    } catch (err: unknown) {
      if (!(err instanceof AxiosError)) {
        this.emit('user-error', err as Error)
        return;
      }

      switch (err.response?.status) {
        case 401:
          this.emit('user-error', new InvalidAccessToken('Malformed or missing token'))
          break;
        case 500:
          this.emit('user-error', new ServerError('Internal Server Error'))
          break;
        default:
          this.emit('user-error', err)
          break;
      }
    } 
  }
}

export default UserManager;