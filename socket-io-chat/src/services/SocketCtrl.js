import { io } from "socket.io-client";

class SocketCtrl {
  constructor() {
    this.socket = undefined;
  }
  connect(onConnected) {
    if (this.socket) {
      return;
    }
    this.socket = io(process.env.REACT_APP_SOCKET_HOST);
    this.socket.on("connect", () => {
      if (typeof onConnected === "function") {
        onConnected(this.socket);
      }
    });
  }

  emit(key, data) {
    if (!this.socket) {
      return;
    }
    this.socket.emit(key, data);
  }

  on(key, cb) {
    if (!this.socket) {
      return;
    }
    this.socket.on(key, cb);
  }

  destroy() {
    if (!this.socket) {
      return;
    }
    if (this.socket.connected) {
      this.socket.disconnect();
    }
    this.socket = undefined;
  }
}

export default SocketCtrl;
