"use client";
import { useStatusBar } from "@/hooks/useStatusBar";
import { Fragment } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useStatusBar();
  return <Fragment>{children}</Fragment>;
}
