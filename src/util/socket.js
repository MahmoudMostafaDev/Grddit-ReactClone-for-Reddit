import { io } from "socket.io-client";

class Socket {
  constructor() {
    this.socket = io("https://grdback.netlify.app/.netlify/functions/api", {
      path: "/socket.io",
    });
  }
}

const socket = Object.freeze(new Socket());

export default socket;
