import BranchForm from "@/components/forms/settings/branch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Branch } from "@/lib/types/models";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function AddBranchDialog() {
  const [open, setOpen] = useState(false); // Estado para controlar la apertura del diálogo

  const handleDialogClose = () => {
    setOpen(false); // Cambiar el estado a cerrado
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Agregar Sucursal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-left">Sucursal</DialogTitle>
          <DialogDescription className="text-left text-muted-foreground">
            Agregue una nueva sucursal para administrar
          </DialogDescription>
        </DialogHeader>
        <BranchForm
          branch={{ name: "", maxCapacity: 0 } as Branch}
          closeDialog={handleDialogClose}></BranchForm>
      </DialogContent>
    </Dialog>
  );
}
