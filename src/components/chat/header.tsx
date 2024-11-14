import { Store, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Branch } from "@/lib/types/models";
import { UserRoleEnum } from "@/lib/types/enums";

export default function ChatHeader({
  role,
  members,
  branches,
}: {
  role: UserRoleEnum;
  members: number;
  branches: Branch[];
}) {
  const showChangeBranch = role === UserRoleEnum.PARTNER && branches.length > 1;

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-primary">Güemes</h1>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Users className="h-4 w-4" />
          {members} miembros
        </span>
      </div>
      {showChangeBranch && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-[28px] w-[28px]">
          <Store />
        </Button>
      )}
    </header>
  );
}
