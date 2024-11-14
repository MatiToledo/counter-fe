"use client";
import TabNavigation from "@/components/tabNavigation";
import { SocketProvider } from "@/hooks/context/socket";
import React from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <SocketProvider>
      <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] overflow-y-auto text-white flex flex-col w-full font-[family-name:var(--font-geist-sans)] ">
        {children}
      </div>
      <TabNavigation />
    </SocketProvider>
  );
}
