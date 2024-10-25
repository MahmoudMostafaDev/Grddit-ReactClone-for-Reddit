import { io } from "socket.io-client";

class Socket {
  constructor() {
    this.socket = io("https://app-blue-wave-griddit.fly.dev", {
      path: "/socket.io",
    });
  }
}

const socket = Object.freeze(new Socket());

export default socket;
