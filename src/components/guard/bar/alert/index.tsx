"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialogComponent } from "./dialog";

export function GuardBarAlert() {
  const [showAlertOptions, setShowAlertOptions] = useState(false);

  const sendAlert = (type: string) => {
    setShowAlertOptions(false);
  };

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
