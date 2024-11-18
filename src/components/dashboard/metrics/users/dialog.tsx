import UserForm from "@/components/forms/dashboard/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UUID } from "crypto";
import { Plus } from "lucide-react";

export default function DialogAddUser({ BranchId }: { BranchId: UUID }) {
  return (
    <Dialog>
      <DialogTrigger className="absolute top-3 right-4" asChild>
        <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo miembro</DialogTitle>
        </DialogHeader>
        <UserForm BranchId={BranchId}></UserForm>
      </DialogContent>
    </Dialog>
  );
}
