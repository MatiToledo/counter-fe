"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLES_AND_SUBROLES_DICTIONARIES } from "@/lib/dictionaries";
import { useStore } from "@/lib/state";
import { Branch, User } from "@/lib/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { UUID } from "crypto";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { AlertDeleteUser } from "./alert";
import DialogAddUser from "./dialog";
import { UsersTable } from "./table";

export default function StaffTab({
  branches,
  UserId,
}: {
  branches: Branch[];
  UserId: UUID;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const { selectedBranchId } = useStore();

  const branch = branches.find((b) => b.id === selectedBranchId) as Branch;
  const users = branch.Users.filter((user) => user.id !== UserId);
  const isOwner =
    branch.Users.find(
      (user) => user.role === "partner" && user.subRole === "admin"
    )?.id === UserId;
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "fullName",
      header: "Nombre",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "subRole",
      header: "Rol",
      cell: (info) => {
        return (
          <>
            {
              ROLES_AND_SUBROLES_DICTIONARIES[info.row.original.role][
                info.row.original.subRole
              ]
            }
          </>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        function handleEdit() {
          setUserSelected(row.original);
          setIsOpen(true);
        }
        function handleDelete() {
          setUserSelected(row.original);
          setIsOpenDelete(true);
        }
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className="h-2 w-2"></Trash2>
                Eliminar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>
                <Edit2 className="h-2 w-2"></Edit2>
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <div className="pt-2 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="font-semibold leading-none tracking-tight text-primary">
          Miembros ({branch.name})
        </p>
        <p className="text-sm text-gray-400">
          Invita a los miembros de tu sucursal a colaborar.
        </p>
      </div>
      <UsersTable
        columns={columns}
        data={users}
        setIsOpen={setIsOpen}
        isOwner={isOwner}
      />
      <DialogAddUser
        isOpen={isOpen}
        BranchId={branch.id}
        setIsOpen={setIsOpen}
        userSelected={userSelected}
        setUserSelected={setUserSelected}
      />
      <AlertDeleteUser
        userSelected={userSelected}
        setUserSelected={setUserSelected}
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}></AlertDeleteUser>
    </div>
  );
}
