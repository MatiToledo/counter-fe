"use client";
import { connectSocket, socket } from "@/api/socket";
import TabNavigation from "@/components/tabNavigation";
import { SocketProvider } from "@/hooks/context/socket";
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

  useEffect(() => {
    if (!token) {
      push("/logIn");
      return;
    }
  }, []);

  // const { isConnected } = useSocket(user?.id);
  useStatusBar();

  return (
    <SocketProvider>
      {user && (
        <>
          {children}
          <TabNavigation user={user}></TabNavigation>
        </>
      )}
    </SocketProvider>
  );
}
