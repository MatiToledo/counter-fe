import { io, Socket } from "socket.io-client";

let socket: Socket;
const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3080"
    : "https://flowlyinfo.com:3080";

export const connectSocket = async (token: string) => {
  return new Promise<void>((resolve, reject) => {
    socket = io(SOCKET_URL, {
      reconnection: true,
      extraHeaders: {
        token: `${token}`,
      },
    });

    socket.on("connect", () => {
      resolve(); // Resolve when connected
    });

    socket.on("connect_error", (error) => {
      reject(error); // Reject on error
    });
  });
};

export { socket };
