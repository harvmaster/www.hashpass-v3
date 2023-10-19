type Callback<T> = (data: T) => void;

export class EventEmitter<T extends { event: any, data: any }> {
  private handlers: { [K in T['event']]?: Callback<K extends T ? K : never>[] } = {};

  on<K extends T['event']>(event: K, callback: Callback<T extends { event: K } ? T : never>): void {
    const handlers = this.handlers[event] || [];
    handlers.push(callback);
    this.handlers[event] = handlers;
  }

  off<K extends T['event']>(event: K, callback: Callback<T extends { event: K } ? T['data'] : never>): void {
    const handlers = this.handlers[event];
    if (handlers) {
      this.handlers[event] = handlers.filter(handler => handler !== callback);
    }
  }

  emit<K extends T['event']>(event: K, data: T extends { event: K } ? T['data'] : never): void {
    const handlers = this.handlers[event];
    if (handlers) {
      handlers.forEach(handler => handler({event, data} as K));
    }
  }
}

export default EventEmitter