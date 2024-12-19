import { fetchDeleteUser } from "@/api/endpoints/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUser } from "@/hooks/context/user";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/lib/types/models";
import { Dispatch, SetStateAction } from "react";

export function AlertDeleteAccount({
  handleLogout,
  isOpen,
  setIsOpen,
}: {
  handleLogout: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  const { toast } = useToast();
  function handleOpen() {
    setIsOpen(!isOpen);
  }

  async function handleDelete() {
    try {
      await fetchDeleteUser(user.id);
      handleLogout();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al eliminar la cuenta",
      });
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpen}>
      <AlertDialogContent className="max-w-sm rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará al usuario de tu
            personal y eliminara sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
