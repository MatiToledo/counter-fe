"use client";
import { useStore } from "@/lib/state";
import { UUID } from "crypto";
import { useEffect, useRef, useState } from "react";
import { connectSocket, socket } from "../api/socket";
import { getLSToken } from "@/lib/localStorage";

export default function useSocket(UserId: UUID) {
  const [isConnected, setIsConnected] = useState(socket?.connected || false);
  const previousBranchIdRef = useRef<string | null>(null);
  const { selectedBranchId } = useStore();
  console.log("selectedBranchId: ", selectedBranchId);
  const token = getLSToken();

  useEffect(() => {
    if (token && !socket) return;
    connectSocket(token as string).then(() => setIsConnected(true));
  }, []);

  useEffect(() => {
    if (!UserId || !socket) return;
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
  }, [selectedBranchId, UserId]);

  return { isConnected };
}
