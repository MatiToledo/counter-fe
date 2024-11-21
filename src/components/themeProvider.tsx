"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // const [isMounted, setIsMounted] = React.useState(false);

  // React.useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   // Evitar renderizado en servidor para prevenir inconsistencias.
  //   return <>{children}</>;
  // }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
