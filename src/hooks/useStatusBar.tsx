"use client";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function useStatusBar() {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("CAMBIANDO EL STATUS BAR");

    if (theme === "dark") {
      StatusBar.setBackgroundColor({ color: "#100c0c" });
      StatusBar.setStyle({ style: Style.Dark });
      console.log("CAMBIANDO A DARK");
    } else {
      StatusBar.setBackgroundColor({ color: "#ffffff" });
      StatusBar.setStyle({ style: Style.Light });
      console.log("CAMBIANDO A LIGHT");
    }
  }, [theme]);
}
