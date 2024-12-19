"use client";
import AppContent from "@/components/app/appContent";
import { SocketProvider } from "@/hooks/context/socket";
import { useStatusBar } from "@/hooks/useStatusBar";
import { getLSToken } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const token = getLSToken();
  const { push } = useRouter();
  useEffect(() => {
    if (!token) {
      push("/logIn");
      return;
    }
  }, [token, push]);

  useStatusBar();

  return (
    <SocketProvider>
      <AppContent>{children}</AppContent>
    </SocketProvider>
  );
}
