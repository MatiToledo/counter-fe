"use client";
import TabNavigation from "@/components/tabNavigation";
import { useUser } from "@/hooks/context/user";
import useSocket from "@/hooks/useSocket";
import { useStatusBar } from "@/hooks/useStatusBar";
import { getLSToken } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const { user } = useUser();
  const isAuthenticated = !!getLSToken();
  const { isConnected } = useSocket();
  useStatusBar();
  useEffect(() => {
    if (!isAuthenticated) {
      push("/logIn");
      return;
    }
  }, []);

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
