import { ToastAction } from "@/components/ui/toast";
import { useNewMessageStore } from "@/lib/state";
import { Message } from "@/lib/types/models";
import { UUID } from "crypto";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { socket } from "../api/socket";
import { useToast } from "./use-toast";

export default function useSocket(BranchId: UUID, UserId: UUID) {
  const { toast } = useToast();
  const { push } = useRouter();
  const pathname = usePathname();
  const previousBranchIdRef = useRef<UUID | null>(null);
  const setNewMessage = useNewMessageStore((state) => state.setHaveNewMessage);

  function listenSocketEvents() {
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
  }

  useEffect(() => {
    if (!socket || !BranchId || !UserId) return;

    if (previousBranchIdRef.current) {
      socket.emit("leaveBranch", previousBranchIdRef.current);
    }

    console.log("BranchId: ", BranchId);
    console.log("UserId: ", UserId);
    socket.emit("joinBranch", BranchId, UserId);

    listenSocketEvents();

    previousBranchIdRef.current = BranchId;

    return () => {
      if (previousBranchIdRef.current) {
        socket.emit("leaveBranch", previousBranchIdRef.current);
      }
    };
  }, [BranchId, UserId, socket]);

  return { socket };
}
