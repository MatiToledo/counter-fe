import { UUID } from "crypto";
import { socket } from "../api/socket";
import { Message } from "postcss";
import { useEffect, useRef } from "react";

export default function useSocket(BranchId: UUID, UserId: UUID) {
  const previousBranchIdRef = useRef<UUID | null>(null);

  useEffect(() => {
    // Si hay un BranchId anterior, salir de esa sala
    if (previousBranchIdRef.current) {
      socket.emit("leaveBranch", previousBranchIdRef.current);
    }

    // Unirse a la nueva rama
    socket.emit("joinBranch", BranchId, UserId);

    // Guardar el BranchId actual como el anterior
    previousBranchIdRef.current = BranchId;

    // Cleanup function para manejar la desconexión al desmontar
    return () => {
      if (previousBranchIdRef.current) {
        socket.emit("leaveBranch", previousBranchIdRef.current);
      }
    };
  }, [BranchId]);

  function sendMessage(text: string) {
    const messageToSend: Partial<Message> = {
      UserId,
      BranchId,
      text,
    };

    socket.emit("message", messageToSend);
  }

  return { sendMessage };
}
