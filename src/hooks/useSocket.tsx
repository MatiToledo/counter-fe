"use client";
import { useStore } from "@/lib/state";
import { UUID } from "crypto";
import { useEffect, useRef, useState } from "react";
import { socket } from "../api/socket";

export default function useSocket(UserId: UUID) {
  const [isConnected, setIsConnected] = useState(socket?.connected || false);
  const previousBranchIdRef = useRef<string | null>(null);
  const { selectedBranchId } = useStore();
  useEffect(() => {
    if (!socket) return;
    setIsConnected(socket.connected);
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    if (!UserId || !socket) return;
    if (previousBranchIdRef.current) {
      socket?.emit("leaveBranch", previousBranchIdRef.current);
    }

    socket?.emit("joinBranch", selectedBranchId);

    previousBranchIdRef.current = selectedBranchId;

    return () => {
      if (previousBranchIdRef.current) {
        socket.emit("leaveBranch", previousBranchIdRef.current);
      }
    };
  }, [selectedBranchId, UserId]);

  return { isConnected };
}
