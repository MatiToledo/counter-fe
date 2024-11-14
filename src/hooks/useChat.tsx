import { Message } from "@/lib/types/models";
import { UUID } from "crypto";
import { useEffect, useState, useRef } from "react";
import { useSocket } from "./context/socket";
import { fetchGetMessagesByBranchId } from "@/api/endpoints/message";

export default function useChat(UserId: UUID, BranchId: UUID) {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [haveNewMessage, setHaveNewMessage] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageRef = useRef(page);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinBranch", BranchId, UserId);

    socket.on("previous messages", (initialMessages: Message[]) => {
      console.log("initialMessages: ", initialMessages);
      setMessages(initialMessages);
    });

    socket.on("messageResponse", (msg: Message) => {
      const message = {
        ...msg,
        isYou: msg.UserId === UserId,
      };
      if (!message.isYou) {
        setHaveNewMessage(true);
      }
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("previous messages");
      socket.off("messageResponse");
    };
  }, [socket, BranchId, UserId]);

  const sendMessage = (text: string) => {
    if (socket) {
      const messageToSend: Partial<Message> = {
        UserId,
        BranchId,
        text,
      };

      socket.emit("sendMessage", messageToSend);
    }
  };
  const loadMoreMessages = async (container: HTMLDivElement | null) => {
    if (loadingMore || !container) return;

    setLoadingMore(true);
    const previousScrollHeight = container.scrollHeight;

    console.log("page (before fetch): ", pageRef.current);

    const moreMessages = await fetchGetMessagesByBranchId(
      BranchId,
      pageRef.current + 1
    );

    if (moreMessages.rows.length > 0) {
      setMessages((prevMessages) => [...moreMessages.rows, ...prevMessages]);
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        pageRef.current = nextPage; // Actualizamos la referencia
        return nextPage;
      });

      // Ajustar el scroll para mantener la altura relativa
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - previousScrollHeight;
      }, 0);
    }

    setLoadingMore(false);
  };

  return {
    messages,
    sendMessage,
    loadMoreMessages,
    loadingMore,
    haveNewMessage,
    setHaveNewMessage,
  };
}
