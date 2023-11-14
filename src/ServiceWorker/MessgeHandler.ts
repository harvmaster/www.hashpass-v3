class MessageHandler {
  promises: Record<string, (value: string) => void> = {};

  constructor() {
    this.promises = {};
  }

  createMessage(type: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2, 14);
      this.promises[id] = resolve;
      navigator.serviceWorker.controller?.postMessage({ type, params, id });
    });
  }

  handleMessage(event: MessageEvent) {
    const { id, result } = event.data;
    console.log('SW RETURNED VALUE: ', id, result)
    this.promises[id]?.(result);
    delete this.promises[id];
  }
}

const messageHandler = new MessageHandler()
navigator.serviceWorker.addEventListener('message', messageHandler.handleMessage.bind(messageHandler))

// document.addEventListener('')

export default messageHandler