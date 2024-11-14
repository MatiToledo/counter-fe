"use client";

import useChat from "@/hooks/useChat";
import { User } from "@/lib/types/models";
import ChatHeader from "./header";
import MessagesChat from "./messages";
import SendMessage from "./send";

export default function ChatComponent({ user }: { user: User }) {
  const {
    messages,
    sendMessage,
    loadMoreMessages,
    loadingMore,
    haveNewMessage,
    setHaveNewMessage,
  } = useChat(user.id, user.Branches[0].id);
  const members = user.Branches[0].Users.length;
  return (
    <div className="flex flex-col bg-background ">
      <ChatHeader members={members} branches={user.Branches} role={user.role} />
      <MessagesChat
        messages={messages}
        loadMoreMessages={loadMoreMessages}
        loadingMore={loadingMore}
        haveNewMessage={haveNewMessage}
        setHaveNewMessage={setHaveNewMessage}
      />
      <SendMessage sendMessage={sendMessage}></SendMessage>
    </div>
  );
}
