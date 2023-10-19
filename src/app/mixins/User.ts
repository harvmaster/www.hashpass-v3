import { LocalStorage } from 'quasar';
import { api } from 'boot/axios';

import Observable from '../EventEmitter';
import { ServerError, InvalidCredentialsError, DuplicateUsernameError } from '../errors';
import { algorithms } from 'src/crypto/passwordGenerators'
import InvalidAccessToken from '../errors/InvalidAccessToken';

export interface UserInterface {
  username: string | undefined;
  settings: {
    algorithm: string;
  };

  on: (event: 'login' | 'logout' | 'register', listener: (data: LoginResponse | undefined) => void) => void;
}

export interface LoginResponse {
  username: string;
  settings: {
    algorithm: string;
  };
  access_token: string;
  refresh_token: string;
}

export interface UserResponse {
  username: string;
  settings: {
    algorithm: string;
  };
}

export class User extends Observable implements UserInterface {
  username: string | undefined;
  settings: {
    algorithm: string;
  }

  constructor() {
    super();

    this.username = undefined
    this.settings = {
      algorithm: 'hp2'
    }
  }

  initializeUser() {
    this.username = LocalStorage.getItem('username')?.toString() || this.username;
    this.settings = LocalStorage.getItem('settings') || this.settings;

    if (!algorithms.includes(this.settings.algorithm)) {
      this.settings.algorithm = 'hp2';
      LocalStorage.set('settings', this.settings);
    }

    return this.username !== undefined
  }

  async loginUser({ username, password }: { username: string; password: string; }) {
    try {
      const { data }: { data: UserResponse } = await api.post('/user/login', {
        username,
        password
      });

      this.username = data.username;
      this.settings = data.settings;
      LocalStorage.set('username', data.username);
      LocalStorage.set('settings', data.settings);
      this.emit('login', data);
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          throw new InvalidCredentialsError('Invalid username or password');
        }
        if (err.response.status === 500) {
          throw new ServerError('Server error, try again later');
        }
        throw err;
      } else {
        throw err;
      }
    }

  }

  async registerUser({ username, password }: { username: string; password: string; }) {
    try {
      const { data }: { data: LoginResponse} = await api.post('/user', {
        username,
        password
      });

      this.username = data.username;
      this.settings = data.settings;
      LocalStorage.set('username', data.username);
      LocalStorage.set('settings', data.settings);
      this.emit('register', data);
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 409) {
          throw new DuplicateUsernameError('Username already exists');
        }
        if (err.response.status === 500) {
          throw new ServerError('Server error, try again later');
        }
        throw err;
      } else {
        throw err;
      }
    }
  }

  async logoutUser() {
    this.username = undefined;
    this.settings = {
      algorithm: 'hp2'
    };
    localStorage.removeItem('username');
    localStorage.removeItem('settings');
  }

  async refreshUser () {
    try {
      const { data }: { data: LoginResponse } = await api.get('/user');

      this.username = data.username;
      this.settings = data.settings;
      LocalStorage.set('username', data.username);
      LocalStorage.set('settings', data.settings);
      this.emit('login', data);
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      if (err.response.status === 401) {
        throw new InvalidAccessToken('Invalid access token');
      }
      if (err.response.status === 500) {
        throw new ServerError('Server error, try again later');
      }
      throw err;
    }
  }
}

export default User