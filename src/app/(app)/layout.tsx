"use client";
import { connectSocket } from "@/api/socket";
import TabNavigation from "@/components/tabNavigation";
import { getLSToken } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const isAuthenticated = !!getLSToken();

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
