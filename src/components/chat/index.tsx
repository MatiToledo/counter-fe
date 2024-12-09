"use client";

import { User } from "@/lib/types/models";
import { useEffect } from "react";
import ChatHeader from "./header";
import MessagesChat from "./messages";
import SendMessage from "./send";
import {
  getLSBranchId,
  saveLSBranchId,
  saveLSNewMessage,
} from "@/lib/localStorage";

export default function ChatComponent({ user }: { user: User }) {
  const selectedBranch = getLSBranchId();
  useEffect(() => {
    saveLSBranchId(user.Branches[0].id);
    saveLSNewMessage(false);
  }, []);

  return (
    <div className="flex flex-col bg-background ">
      <ChatHeader
        members={
          user.Branches.find((b) => b.id === selectedBranch)?.Users.length || 1
        }
        branches={user.Branches}
        role={user.role}
        BranchId={selectedBranch}
      />
      <MessagesChat BranchId={selectedBranch} UserId={user.id} />
      <SendMessage BranchId={selectedBranch} UserId={user.id}></SendMessage>
    </div>
  );
}
