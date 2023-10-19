interface Callback {
  [key: string] : ((data: any) => void)[];
}

interface EventEmitterInterface {
  handlers: Callback;
  on: (event: string, handler: (data: any) => void) => void;
  off: (handler: any) => void;
  emit: (event: string, data: any) => void;
}

export class EventEmitter implements EventEmitterInterface {
  handlers: Callback;
  
  constructor() {
    this.handlers = {};
  }
  on(event: string, handler: (data: any) => void) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }
  off(handler: any) {
    Object.keys(this.handlers).forEach((event) => {
      this.handlers[event] = this.handlers[event].filter((obs) => obs !== handler);
    });
  }
  emit(event: string, data: any) {
    if (!this.handlers[event]) {
      return;
    }
    this.handlers[event].forEach((observer) => observer(data));
  }
}

export default EventEmitter