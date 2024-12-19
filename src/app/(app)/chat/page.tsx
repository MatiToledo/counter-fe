"use client";
import ChatComponent from "@/components/app/chat";
import FallbackComponent from "@/components/common/fallback";
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
