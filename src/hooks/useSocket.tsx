"use client";
import { UUID } from "crypto";
import { useEffect, useRef } from "react";
import { socket } from "../api/socket";

export default function useSocket(BranchId: UUID, UserId: UUID) {
  const previousBranchIdRef = useRef<UUID | null>(null);

  useEffect(() => {
    if (!socket || !BranchId || !UserId) return;

    if (previousBranchIdRef.current) {
      socket.emit("leaveBranch", previousBranchIdRef.current);
    }

    socket.emit("joinBranch", BranchId, UserId);

    previousBranchIdRef.current = BranchId;

    return () => {
      if (previousBranchIdRef.current) {
        socket.emit("leaveBranch", previousBranchIdRef.current);
      }
    };
  }, [BranchId, UserId, socket]);

  return { socket };
}
