"use client";

import { useNewMessageStore, useSelectedBranchStore } from "@/lib/state";
import { User } from "@/lib/types/models";
import { useEffect } from "react";
import ChatHeader from "./header";
import MessagesChat from "./messages";
import SendMessage from "./send";

export default function ChatComponent({ user }: { user: User }) {
  const setNewMessage = useNewMessageStore((state) => state.setHaveNewMessage);
  const selectedBranch = useSelectedBranchStore(
    (state) => state.selectedBranch
  );
  const setSelectedBranch = useSelectedBranchStore(
    (state) => state.setSelectedBranch
  );

  useEffect(() => {
    setSelectedBranch(user.Branches[0].id);
    setNewMessage(false);
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
        setBranchId={setSelectedBranch}
      />
      <MessagesChat BranchId={selectedBranch} UserId={user.id} />
      <SendMessage BranchId={selectedBranch} UserId={user.id}></SendMessage>
    </div>
  );
}
