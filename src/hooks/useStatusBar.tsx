"use client";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function useStatusBar() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      StatusBar.setBackgroundColor({ color: "#0a0a0a" });
      StatusBar.setStyle({ style: Style.Dark });
    } else {
      StatusBar.setBackgroundColor({ color: "#ffffff" });
      StatusBar.setStyle({ style: Style.Light });
    }
  }, [theme]);
}
