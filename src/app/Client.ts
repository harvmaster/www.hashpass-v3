import { User, TokenManager, PasswordManager } from './mixins'

interface ClientInterface {
  User: User;

  PasswordManager: PasswordManager;
  TokenManager: TokenManager;
}

export class Client implements ClientInterface {

  User: User
  PasswordManager: any;
  TokenManager: any;

  constructor() {
    this.User = new User()
    this.PasswordManager = new PasswordManager()
    this.TokenManager = new TokenManager()
  }

  async initializeClient() {
    this.PasswordManager.on('logout', () => this.logout())
    this.TokenManager.on('logout', () => this.logout())

    this.User.on('login', (data: any) => {
      this.TokenManager.setTokens(data)
    })

    this.User.on('register', (data: any) => {
      this.TokenManager.setTokens(data)  
    })

    let tokenPromise = this.TokenManager.initializeTokenManager().catch((err: any) => err)

    try {
      if (!this.PasswordManager.initializePasswordManager() || (!(tokenPromise instanceof Promise) && !tokenPromise)) {
        return this.logout()
      }
      
      if (!this.User.initializeUser()) {
        if (tokenPromise instanceof Promise) {
          tokenPromise = await tokenPromise
        }

        if (tokenPromise instanceof Error) {
          return this.logout()
        }

        await this.User.refreshUser()
      }
    } catch (err: any) {
      return this.logout()
    }
  }

  set

  logout () {
    this.User.logoutUser()
    this.PasswordManager.clear()
    this.TokenManager.clearTokens()
  }

}

const client = new Client()

export default client