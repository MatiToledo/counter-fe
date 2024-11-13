"use client";
import TabNavigation from "@/components/tabNavigation";
import React, { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <Fragment>
      <div className="min-h-[calc(100vh-50px)] text-white flex flex-col items-center justify-between p-6">
        {children}
      </div>
      <TabNavigation />
    </Fragment>
  );
}
