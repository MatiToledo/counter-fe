import UserForm from "@/components/forms/dashboard/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/lib/types/models";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";

export default function DialogAddUser({
  BranchId,
  isOpen,
  setIsOpen,
  userSelected,
  setUserSelected,
}: {
  BranchId: UUID;
  userSelected?: User | null;
  isOpen: boolean;
  setUserSelected: Dispatch<SetStateAction<User | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  function handleOpen() {
    setIsOpen(!isOpen);
    setUserSelected(null);
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo miembro</DialogTitle>
        </DialogHeader>
        <UserForm BranchId={BranchId} userSelected={userSelected}></UserForm>
      </DialogContent>
    </Dialog>
  );
}
