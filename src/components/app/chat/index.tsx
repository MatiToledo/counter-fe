"use client";

import { saveLSNewMessage } from "@/lib/localStorage";
import { useStore } from "@/lib/state";
import { User } from "@/lib/types/models";
import { useEffect } from "react";
import ChatHeader from "./header";
import MessagesChat from "./messages";
import SendMessage from "./send";

export default function ChatComponent({ user }: { user: User }) {
  const { selectedBranchId } = useStore();

  useEffect(() => {
    saveLSNewMessage(false);
  }, []);

  return (
    <div className="flex flex-col bg-background ">
      <ChatHeader
        members={
          user.Branches.find((b) => b.id === selectedBranchId)?.Users.length ||
          1
        }
        branches={user.Branches}
        role={user.role}
        BranchId={selectedBranchId}
      />
      <MessagesChat BranchId={selectedBranchId} UserId={user.id} />
      <SendMessage BranchId={selectedBranchId} UserId={user.id}></SendMessage>
    </div>
  );
}
