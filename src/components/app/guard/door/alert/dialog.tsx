import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ALERTS_DICTIONARY } from "@/lib/dictionaries";
import { AlertCircle, Martini, HandHelping } from "lucide-react";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendAlert: (type: string) => void;
}

export function AlertDialogComponent({
  open,
  onOpenChange,
  onSendAlert,
}: AlertDialogProps) {
  const alerts = [
    {
      icon: <AlertCircle className="h-4 w-4" />,
      type: "AUTHORITIES_INTERVENTION",
      title: "Intervención de autoridades",
    },
    {
      icon: <Martini className="h-4 w-4" />,
      type: "DISTURBANCE_AT_DOOR",
      title: "Disturbios en puerta",
    },
    {
      icon: <HandHelping className="h-4 w-4" />,
      title: "Necesidad de ayuda adicional",
      type: "ADDITIONAL_HELP",
    },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Enviar Alerta</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Button
              key={alert.type}
              onClick={() => onSendAlert(alert.type)}
              className="flex items-center justify-start gap-2">
              {alert.icon}
              {ALERTS_DICTIONARY.find((a) => a.type === alert.type)?.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
