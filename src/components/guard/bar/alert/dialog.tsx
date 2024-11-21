import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      title: "Disturbios",
    },
    {
      icon: <Martini className="h-4 w-4" />,
      title: "Persona Ebria",
    },
    {
      icon: <HandHelping className="h-4 w-4" />,
      title: "Solicitar Ayuda",
    },
    {
      icon: <CircleSlash2 className="h-4 w-4" />,
      title: "Capacidad Excedida",
    },
    {
      icon: <Volume2 className="h-4 w-4" />,
      title: "Volumen Alto",
    },
    {
      icon: <Siren className="h-4 w-4" />,
      title: "Actividad Sospechosa",
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
              onClick={() => onSendAlert(alert.title)}
              className="flex items-center justify-start gap-2">
              {alert.icon}
              {alert.title}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
