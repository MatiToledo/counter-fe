"use client";
import { connectSocket } from "@/api/socket";
import TabNavigation from "@/components/tabNavigation";
import React, { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  connectSocket();
  return (
    <Fragment>
      <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] overflow-y-auto text-white flex flex-col w-full font-[family-name:var(--font-geist-sans)] ">
        {children}
      </div>
      <TabNavigation />
    </Fragment>
  );
}
