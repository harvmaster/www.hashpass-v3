// import { UserEvents, AuthEvents } from "./Managers/UserManager/types"

// import { Message, EventTypes } from "./types"

// // type AuthEvents = 'login-success' | 'login-error' | 'register-success' | 'register-error'
// // type UserEvents = 'username-change' | 'settings-changed' | 'user-error' | 'user-cleared' | 'user-refreshed'

// type PasswordEvents = 'secret-change' | 'secret-error' | 'secret-cleared' | 'secret-encrypted' | 'secret-decrypted' | 'password-generated' | 'data-encrypted' | 'data-decryped'
// type TokenEvents = 'refresh-token-change' | 'access-token-change' | 'token-error' | 'tokens-cleared'

// type EmittedEvents = AuthEvents | UserEvents | PasswordEvents | TokenEvents

// // type Message = {
// //   event: EmittedEvents;
// //   data: any;
// // }

// export interface Client {
//   User: UserManager;
//   PasswordManager: PasswordManager;
//   TokenManager: TokenManager;

//   on: (event: EmittedEvents, listener: (message: Message) => void) => void;
// }

import EventEmitter from "./EventEmitter";
import { UserManager } from "./Managers/UserManager/UserManager";

import { Message } from "./types";

export class Client {
  User: UserManager;

  constructor() {
    // super();

    this.User = new UserManager();
  }

  initialize() {
    this.User.on('login-success', this.broadcastEvent)
    this.User.on('login-error', this.broadcastEvent)
    this.User.on('register-success', this.broadcastEvent)
    this.User.on('register-error', this.broadcastEvent)

    this.User.on('username-change', (data) => {
      
    })
    this.User.on('settings-change', (data) => {

    })
    this.User.on('user-error', this.broadcastEvent)
    this.User.on('user-cleared', this.broadcastEvent)

    // this.User.on('login-success', this.TokenManager.setTokens)

    this.User.initialize();
  }

  // Sends the event to the window client
  broadcastEvent(message: Message) {
    postMessage(message);
  }


}