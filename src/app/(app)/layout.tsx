"use client";
import { connectSocket } from "@/api/socket";
import TabNavigation from "@/components/tabNavigation";
import { useUser } from "@/hooks/context/user";
import useSocket from "@/hooks/useSocket";
import { getLSToken } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const { user } = useUser();
  const isAuthenticated = !!getLSToken();
  useSocket(user?.Branches[0].id, user?.id);

  useEffect(() => {
    if (!isAuthenticated) {
      push("/logIn");
      return;
    }
    connectSocket();
  }, []);

  return (
    <>
      {children}
      <TabNavigation></TabNavigation>
    </>
  );
}
