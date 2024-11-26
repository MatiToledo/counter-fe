import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ALERTS_DICTIONARY } from "@/lib/dictionaries";

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
          {ALERTS_DICTIONARY.map((alert) => (
            <Button
              key={alert.type}
              onClick={() => onSendAlert(alert.type)}
              className="flex items-center justify-start gap-2">
              {alert.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
