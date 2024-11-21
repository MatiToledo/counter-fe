"use client";
import ChatComponent from "@/components/chat";
import FallbackComponent from "@/components/fallback";
import { useUser } from "@/hooks/context/user";
import { Fragment } from "react";

export default function Chat() {
  const { isLoading, user } = useUser();
  return (
    <Fragment>
      {isLoading && <FallbackComponent />}
      {user && <ChatComponent user={user} />}
    </Fragment>
  );
}
