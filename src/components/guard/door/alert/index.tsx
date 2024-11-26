"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialogComponent } from "./dialog";
import { fetchCreateAlert } from "@/api/endpoints/alert";
import { useToast } from "@/hooks/use-toast";
import { UUID } from "crypto";

export function GuardAlert({ BranchId }: { BranchId: UUID }) {
  const { toast } = useToast();
  const [showAlertOptions, setShowAlertOptions] = useState(false);

  async function sendAlert(type: string) {
    await fetchCreateAlert({ type, BranchId });
    toast({
      variant: "default",
      title: "Alerta enviada",
      description: "Se ha enviado la alerta correctamente",
    });
    setShowAlertOptions(false);
  }

  return (
    <div className="w-full max-w-xs flex justify-between gap-4">
      <Button
        variant="destructive"
        className="flex-1"
        onClick={() => setShowAlertOptions(true)}>
        Alerta
      </Button>
      <AlertDialogComponent
        open={showAlertOptions}
        onOpenChange={setShowAlertOptions}
        onSendAlert={sendAlert}
      />
    </div>
  );
}
