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

export default function UsersDashboard({
  branch,
  UserId,
}: {
  branch: Branch;
  UserId: UUID;
}) {
  const users = branch.Users.filter((user) => user.id !== UserId);
  const isOwner =
    branch.Users.find(
      (user) => user.role === "partner" && user.subRole === "admin"
    )?.id === UserId;

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <CardTitle>Miembros</CardTitle>
        <CardDescription className="text-gray-400">
          Invita a los miembros de tu sucursal a colaborar.
        </CardDescription>
        {isOwner && <DialogAddUser BranchId={branch.id}></DialogAddUser>}
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto max-h-[320px]">
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
                <span className="font-medium text-primary">
                  {ROLES_AND_SUBROLES_DICTIONARIES[user.role][user.subRole]}
                </span>
                <Trash2 className="w-4 h-4"></Trash2>
              </div>
            </div>
          );
        })}
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
                <span className="font-medium text-primary">
                  {ROLES_AND_SUBROLES_DICTIONARIES[user.role][user.subRole]}
                </span>
                <Trash2 className="w-4 h-4"></Trash2>
              </div>
            </div>
          );
        })}
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
                <span className="font-medium text-primary">
                  {ROLES_AND_SUBROLES_DICTIONARIES[user.role][user.subRole]}
                </span>
                <Trash2 className="w-4 h-4"></Trash2>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
