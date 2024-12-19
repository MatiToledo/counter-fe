/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TabNavigation from "@/components/app/tabNavigation";
import { useSocket } from "@/hooks/context/socket"; // Asegúrate de importar correctamente
import { useUser } from "@/hooks/context/user";
import { Loader2 } from "lucide-react";

export default function AppContent({ children }: any) {
  const { isConnected, socket } = useSocket(); // Obtener el estado de conexión del socket
  const { user } = useUser();

  return (
    <>
      {isConnected && socket && user ? (
        <>
          {children}
          <TabNavigation user={user} />
        </>
      ) : (
        <div className="h-screen flex justify-center w-screen items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </>
  );
}
