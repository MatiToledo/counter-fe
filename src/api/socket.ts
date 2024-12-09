import { getLSToken } from "@/lib/localStorage";
import { io, Socket } from "socket.io-client";

let socket: Socket;
const SOCKET_URL = "https://flowlyinfo.com:3080";
// const SOCKET_URL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3080"
//     : "https://flowlyinfo.com:3080";
const token = getLSToken();
const isBrowser = typeof window !== "undefined";

if (token && isBrowser) {
  socket = io(SOCKET_URL, {
    reconnection: true,
    extraHeaders: {
      token,
    },
  });
}

export { socket };
