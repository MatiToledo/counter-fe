"use client";
import { useStore } from "@/lib/state";
import { UUID } from "crypto";
import { useEffect, useRef, useState } from "react";
import { socket } from "../api/socket";

export default function useSocket() {
  const [isConnected, setIsConnected] = useState(socket?.connected || false);

  const previousBranchIdRef = useRef<UUID | null>(null);
  const { selectedBranchId } = useStore();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (previousBranchIdRef.current) {
      socket.emit("leaveBranch", previousBranchIdRef.current);
    }

    socket.emit("joinBranch", selectedBranchId);

    previousBranchIdRef.current = selectedBranchId;

    return () => {
      if (previousBranchIdRef.current) {
        socket.emit("leaveBranch", previousBranchIdRef.current);
      }
    };
  }, [selectedBranchId]);

  return { isConnected };
}
