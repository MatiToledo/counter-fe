/* eslint-disable @typescript-eslint/no-explicit-any */
import { SOCKET_URL } from "@/lib/constants";
import { getLSToken } from "@/lib/localStorage";
import { useStore } from "@/lib/state";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

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
  console.log("isConnected: ", isConnected);
  const { selectedBranchId } = useStore();
  const previousBranchId = useRef<string | null>(null);

  useEffect(() => {
    const token = getLSToken() as string;
    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      extraHeaders: {
        token: `${token}`,
      },
    });

    // Manejar el estado de la conexión
    newSocket.on("connect", () => {
      setIsConnected(true);

      // Emitir joinBranch al reconectar
      if (selectedBranchId) {
        newSocket.emit("joinBranch", selectedBranchId);
        console.log("Reconectado y unido a branch: ", selectedBranchId);
      }
    });

    newSocket.on("disconnect", () => setIsConnected(false));
    newSocket.on("connect_error", () => setIsConnected(false));
    newSocket.on("reconnect_failed", () => setIsConnected(false));

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [selectedBranchId]); // Agrega selectedBranchId aquí para asegurar que esté sincronizado

  useEffect(() => {
    if (socket) {
      // Salir de la branch anterior
      if (previousBranchId.current) {
        socket.emit("leaveBranch", previousBranchId.current);
      }

      // Unirse a la nueva branch
      if (selectedBranchId) {
        socket.emit("joinBranch", selectedBranchId);
        console.log("Me conecté a un branch: ", selectedBranchId);
      }

      previousBranchId.current = selectedBranchId;
    }
  }, [socket, selectedBranchId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
