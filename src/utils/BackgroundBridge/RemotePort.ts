const EventEmitter = require('events').EventEmitter;

class RemotePort extends EventEmitter {
  constructor(sendMessage: () => void) {
    super();
    this.sendMessage = sendMessage;
  }

  postMessage = (msg: any) => {
    this.sendMessage(msg);
  };
}

export default RemotePort;
