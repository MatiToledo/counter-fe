import { io, Socket } from "socket.io-client";

let socket: Socket;
const SOCKET_URL = "http://localhost:3080";

export const connectSocket = () => {
  socket = io(SOCKET_URL, {
    reconnection: true,
  });
};

export { socket };
