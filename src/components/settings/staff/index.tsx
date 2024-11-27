"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLES_AND_SUBROLES_DICTIONARIES } from "@/lib/dictionaries";
import { Branch } from "@/lib/types/models";
import { UUID } from "crypto";
import DialogAddUser from "./dialog";
import { Trash2 } from "lucide-react";
import { useSelectedBranchStore } from "@/lib/state";

export default function StaffTab({
  branches,
  UserId,
}: {
  branches: Branch[];
  UserId: UUID;
}) {
  const selectedBranch = useSelectedBranchStore(
    (state) => state.selectedBranch
  );
  const branch = branches.find((b) => b.id === selectedBranch) as Branch;
  const users = branch.Users.filter((user) => user.id !== UserId);
  const isOwner =
    branch.Users.find(
      (user) => user.role === "partner" && user.subRole === "admin"
    )?.id === UserId;

  return (
    <div className="pt-2 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="font-semibold leading-none tracking-tight">Miembros</p>
        <p className="text-sm text-gray-400">
          Invita a los miembros de tu sucursal a colaborar.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="flex items-end justify-between border-blue-50 border-b-[1px] pb-2">
              <div className="flex flex-col">
                <p className="text-primary">{user.fullName}</p>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-primary">
                  {ROLES_AND_SUBROLES_DICTIONARIES[user.role][user.subRole]}
                </span>
                <Trash2 className="w-4 h-4 mb-1"></Trash2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
