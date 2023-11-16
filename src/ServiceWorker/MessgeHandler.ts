class MessageHandler {
  promises: Record<string, {resolve: (value: string) => void, reject: (value: string) => void}> = {};

  constructor() {
    this.promises = {};
  }

  createMessage(type: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2, 14);
      this.promises[id] = { resolve, reject };
      navigator.serviceWorker.controller?.postMessage({ type, params, id });
    });
  }

  handleMessage(event: MessageEvent) {
    const { id, result } = event.data;
    // console.log('SW RETURNED VALUE: ', id, result)

    if (result.type == 'error') {
      this.promises[id]?.reject(result.error);
    } else {
      this.promises[id]?.resolve(result);
    }

    delete this.promises[id];
  }
}

const messageHandler = new MessageHandler()
navigator.serviceWorker.addEventListener('message', messageHandler.handleMessage.bind(messageHandler))

// document.addEventListener('')

export default messageHandler