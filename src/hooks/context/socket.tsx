/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLSToken } from "@/lib/localStorage";
import { useStore } from "@/lib/state";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3080"
    : "https://flowlyinfo.com:3080";

interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { selectedBranchId } = useStore();
  useEffect(() => {
    const token = getLSToken() as string;
    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      extraHeaders: {
        token: `${token}`,
      },
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket && selectedBranchId) {
      socket.emit("joinBranch", selectedBranchId);
    }
  }, [socket, selectedBranchId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
