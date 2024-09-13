import { io } from "socket.io-client";

class Socket {
  constructor() {
    this.socket = io("https://grddit-backend.onrender.com", {
      path: "/socket.io",
    });
  }
}

const socket = Object.freeze(new Socket());

export default socket;
