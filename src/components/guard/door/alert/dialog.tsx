import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, AlertTriangle, HelpCircle } from "lucide-react";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Enviar Alerta</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Button
            onClick={() => onSendAlert("authorities")}
            className="flex items-center justify-start gap-2">
            <AlertCircle className="h-4 w-4" />
            Intervención de autoridades
          </Button>
          <Button
            onClick={() => onSendAlert("disturbance")}
            className="flex items-center justify-start gap-2">
            <AlertTriangle className="h-4 w-4" />
            Disturbios en puerta
          </Button>
          <Button
            onClick={() => onSendAlert("help")}
            className="flex items-center justify-start gap-2">
            <HelpCircle className="h-4 w-4" />
            Necesidad de ayuda adicional
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
