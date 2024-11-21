import { UUID } from "crypto";
import { useEffect, useRef, useState } from "react";
import { connectSocket, socket } from "../api/socket";
import { Message } from "@/lib/types/models";
import { useNewMessageStore } from "@/lib/state";
import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";
import { usePathname, useRouter } from "next/navigation";

export default function useSocket(BranchId: UUID, UserId: UUID) {
  const { toast } = useToast();
  const { push } = useRouter();
  const pathname = usePathname();
  const previousBranchIdRef = useRef<UUID | null>(null);
  const setNewMessage = useNewMessageStore((state) => state.setHaveNewMessage);

  useEffect(() => {
    if (!socket) return;

    if (previousBranchIdRef.current) {
      socket.emit("leaveBranch", previousBranchIdRef.current);
    }

    socket.emit("joinBranch", BranchId, UserId);

    socket.on("message", (msg: Message) => {
      const isYou = msg.UserId === UserId;
      if (!isYou && pathname !== "/chat") {
        setNewMessage(true);
        toast({
          title: msg.sender,
          description: msg.text,
          action: (
            <ToastAction altText="Ver" onClick={() => push("/chat")}>
              Ver
            </ToastAction>
          ),
        });
      }
    });

    previousBranchIdRef.current = BranchId;

    return () => {
      if (previousBranchIdRef.current) {
        socket.emit("leaveBranch", previousBranchIdRef.current);
      }
    };
  }, [BranchId, socket]);

  return;
}
