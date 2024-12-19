import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ALERTS_DICTIONARY } from "@/lib/dictionaries";
import {
  AlertCircle,
  CircleSlash2,
  HandHelping,
  Martini,
  Siren,
  Volume2,
} from "lucide-react";

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
      type: "DISTURBANCE_AT_BAR",
    },
    {
      icon: <Martini className="h-4 w-4" />,
      type: "DRUNK_PERSON",
    },
    {
      icon: <HandHelping className="h-4 w-4" />,
      type: "REQUEST_ASSISTANCE",
    },
    {
      icon: <CircleSlash2 className="h-4 w-4" />,
      type: "OVER_CAPACITY",
    },
    {
      icon: <Volume2 className="h-4 w-4" />,
      type: "EXCESSIVE_VOLUME",
    },
    {
      icon: <Siren className="h-4 w-4" />,
      type: "SUSPICIOUS_EMPLOYEE_BEHAVIOR",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Enviar Alerta</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {alerts.map((alert, index) => (
            <Button
              key={index}
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
