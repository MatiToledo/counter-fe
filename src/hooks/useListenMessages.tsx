import { ToastAction } from "@/components/ui/toast";
import { saveLSNewMessage } from "@/lib/localStorage";
import { Message } from "@/lib/types/models";
import { UUID } from "crypto";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "./use-toast";
import { useSocket } from "./context/socket";

export default function useListenMessages(UserId: UUID) {
  const { socket } = useSocket();
  const { push } = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  useEffect(() => {
    if (!socket) return;
    socket?.on("message", (msg: Message) => {
      const isYou = msg.UserId === UserId;
      if (!isYou && pathname !== "/chat") {
        saveLSNewMessage(true);
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
    return () => {
      socket.off("message");
    };
  }, [socket]);
}
