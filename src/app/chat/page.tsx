"use client";
import ChatComponent from "@/components/chat";
import { useUser } from "@/hooks/context/user";
import { Fragment } from "react";

export default function Chat() {
  const context = useUser();
  return (
    <Fragment>
      {context.loading && !context.user ? (
        <div>Loading...</div>
      ) : (
        <ChatComponent user={context.user} />
      )}
    </Fragment>
  );
}
