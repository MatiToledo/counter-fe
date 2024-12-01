"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialogComponent } from "./dialog";
import { fetchCreateAlert } from "@/api/endpoints/alert";
import { UUID } from "crypto";
import { useToast } from "@/hooks/use-toast";

export function GuardBarAlert({ BranchId }: { BranchId: UUID }) {
  const [showAlertOptions, setShowAlertOptions] = useState(false);
  const { toast } = useToast();
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
    <div className="w-full  flex justify-between gap-4 ">
      <Button
        variant="destructive"
        className="w-full"
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
