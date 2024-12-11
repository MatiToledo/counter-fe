"use client";
import { connectSocket, socket } from "@/api/socket";
import TabNavigation from "@/components/tabNavigation";
import { useUser } from "@/hooks/context/user";
import useSocket from "@/hooks/useSocket";
import { useStatusBar } from "@/hooks/useStatusBar";
import { getLSToken } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const token = getLSToken();
  const { push } = useRouter();
  const { user } = useUser();
  const { isConnected } = useSocket(user?.id);
  useEffect(() => {
    if (!token) {
      push("/logIn");
      return;
    }
    if (!socket && token) {
      connectSocket(token as string);
    }
  }, []);
  useStatusBar();

  return (
    <>
      {user && isConnected && (
        <>
          {children}
          <TabNavigation user={user}></TabNavigation>
        </>
      )}
    </>
  );
}
