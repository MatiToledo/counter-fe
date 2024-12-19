import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogEntryProps {
  onEntry: (type?: string) => void;
  showEntryTypes: boolean;
  setShowEntryTypes: (show: boolean) => void;
}

export default function DialogEntry({
  showEntryTypes,
  setShowEntryTypes,
  onEntry,
}: DialogEntryProps) {
  return (
    <Dialog open={showEntryTypes} onOpenChange={setShowEntryTypes}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Tipo de Entrada</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          <Button onClick={() => onEntry("paid")}>
            Entrada Paga (predeterminada)
          </Button>
          <Button onClick={() => onEntry("free")}>Free Pass</Button>
          <Button onClick={() => onEntry("qr")}>QR</Button>
          <Button onClick={() => onEntry("vip")}>VIP/Embajadora</Button>
          <Button onClick={() => onEntry("guest")}>Lista de Invitados</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
