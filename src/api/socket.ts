import { io, Socket } from "socket.io-client";

let socket: Socket;
const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3080"
    : "https://flowlyinfo.com:3080";

export const connectSocket = (token: string) => {
  socket = io(SOCKET_URL, {
    reconnection: true,
    extraHeaders: {
      token: `${token}`,
    },
  });
};

export { socket };
