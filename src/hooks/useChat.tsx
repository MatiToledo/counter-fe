import { fetchGetMessagesByBranchId } from "@/api/endpoints/message";
import { socket } from "@/api/socket";
import { Message } from "@/lib/types/models";
import { UUID } from "crypto";
import { useState } from "react";
import useSWR from "swr";

export default function useChat(BranchId: UUID, UserId: UUID) {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [haveNewMessage, setHaveNewMessage] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, mutate } = useSWR(
    `/message/branch/${BranchId}?page=${page}&limit=15`,
    (url) => fetchGetMessagesByBranchId(url),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      onSuccess: (result) => {
        if (page === 1) {
          setMessages(result.rows);
        } else {
          setMessages((prevMessages) => [...result.rows, ...prevMessages]);
        }
      },
    }
  );

  socket.on("message", (msg: Message) => {
    const message = {
      ...msg,
      isYou: msg.UserId === UserId,
    };
    if (!message.isYou) {
      setHaveNewMessage(true);
    }
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  async function loadMore() {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
    await mutate();
    setIsLoadingMore(false);
  }

  return {
    messages,
    isLoadingMore,
    loadMore,
    setPage,
    haveNewMessage,
    setHaveNewMessage,
    haveNextPage: data?.haveNextPage,
  };
}
