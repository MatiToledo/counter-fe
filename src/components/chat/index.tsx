"use client";

import { User } from "@/lib/types/models";
import { UUID } from "crypto";
import { useState } from "react";
import ChatHeader from "./header";
import MessagesChat from "./messages";
import useSocket from "@/hooks/useSocket";
import SendMessage from "./send";

export default function ChatComponent({ user }: { user: User }) {
  const [branchId, setBranchId] = useState<UUID>(user.Branches[0].id);
  const { sendMessage } = useSocket(branchId, user.id);
  return (
    <div className="flex flex-col bg-background ">
      <ChatHeader
        members={
          user.Branches.find((b) => b.id === branchId)?.Users.length || 1
        }
        branches={user.Branches}
        role={user.role}
        BranchId={branchId}
        setBranchId={setBranchId}
      />
      <MessagesChat BranchId={branchId} UserId={user.id} />
      <SendMessage sendMessage={sendMessage}></SendMessage>
    </div>
  );
}
