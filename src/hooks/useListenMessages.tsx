import { useEffect } from "react";
import { socket } from "../api/socket";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { useNewMessageStore } from "@/lib/state";
import { Message } from "@/lib/types/models";
import { UUID } from "crypto";
import { ToastAction } from "@/components/ui/toast";

export default function useListenMessages(UserId: UUID) {
  const { push } = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const setNewMessage = useNewMessageStore((state) => state.setHaveNewMessage);
  useEffect(() => {
    if (!socket) return;
    socket.on("message", (msg: Message) => {
      const isYou = msg.UserId === UserId;
      console.log("isYou: ", isYou);
      console.log("pathname: ", pathname);
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
    return () => {
      socket.off("message");
    };
  }, [socket]);
}
