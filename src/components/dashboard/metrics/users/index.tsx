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
    <Card className="">
      <CardHeader className="relative">
        <CardTitle>Miembros</CardTitle>
        <CardDescription className="text-gray-400">
          Invita a los miembros de tu sucursal a colaborar.
        </CardDescription>
        {isOwner && <DialogAddUser BranchId={branch.id}></DialogAddUser>}
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => {
          return (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-primary">{user.fullName}</p>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
              <span className="font-medium text-primary">
                {ROLES_AND_SUBROLES_DICTIONARIES[user.role][user.subRole]}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
