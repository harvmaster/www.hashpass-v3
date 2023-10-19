import { LocalStorage } from 'quasar';
import { api } from 'boot/axios'
import jwt_decode from "jwt-decode";


import EventEmitter from '../EventEmitter';
import { ServerError, UndefinedRefreshTokenError } from '../errors'

export interface TokenManagerInterface {
  accessToken: string | undefined;
  refreshToken: string | undefined;

  initializeTokenManager: () => boolean | Promise<boolean>;
  refreshAccessToken: () => Promise<boolean>;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  isAccessTokenExpired: () => boolean;
  clearTokens: () => void;
}

export class TokenManger extends EventEmitter implements TokenManagerInterface {
  accessToken: string | undefined;
  refreshToken: string | undefined;

  constructor() {
    super()
  }

  initializeTokenManager() {
    this.accessToken = LocalStorage.getItem('access_token') as string ?? this.accessToken;
    this.refreshToken = LocalStorage.getItem('refresh_token') as string ?? this.refreshToken;

    if (!this.refreshToken) {
      this.emit('logout', null)
      return false
    }

    if (!this.accessToken || this.isAccessTokenExpired()) {
      return this.refreshAccessToken()
    }

    return true
  }

  async refreshAccessToken () {
    if (!this.refreshToken) throw new UndefinedRefreshTokenError('Refresh token is undefined')

    try {
      const { data }: { data: { access_token: string } } = await api.post('/user/refresh', {
        refrehs_token: this.refreshToken
      })

      this.accessToken = data.access_token
      LocalStorage.set('access_token', data.access_token)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`

      this.emit('access_token', data.access_token)
      return true
    } catch (err: any) {
      if (!err.response) throw err

      if (err.response.status === 400) {
        this.emit('logout', null)
      }
      if (err.response.status === 401) {
        this.emit('logout', null)
      }
      if (err.response.status === 500) {
        throw new ServerError('Internal server error')
      }
    } finally {
      return false
    }
  }

  setAccessToken (access_token: string) {
    this.accessToken = access_token
    LocalStorage.set('access_token', access_token)
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
  }

  setRefreshToken (refresh_token: string) {
    this.refreshToken = refresh_token
    LocalStorage.set('refresh_token', refresh_token)
  }

  setTokens ({ access_token, refresh_token }: { access_token: string, refresh_token: string }) {
    this.setAccessToken(access_token)
    this.setRefreshToken(refresh_token)
  }

  isAccessTokenExpired () {
    if (!this.accessToken) return true

    const decoded = jwt_decode(this.accessToken) as any
    const now = Date.now() / 1000
    return decoded.exp < now
  }

  clearTokens () {
    this.accessToken = undefined
    this.refreshToken = undefined
    LocalStorage.remove('access_token')
    LocalStorage.remove('refresh_token')
  }
}

export default TokenManger