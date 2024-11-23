import { UserRoleEnum } from "@/lib/types/enums";
import { Branch } from "@/lib/types/models";
import { UUID } from "crypto";
import { Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ChatHeader({
  role,
  members,
  branches,
  BranchId,
  setBranchId,
}: {
  role: UserRoleEnum;
  members: number;
  branches: Branch[];
  BranchId: UUID;
  setBranchId: (selectedBranch: UUID) => void;
}) {
  const canChangeBranch = role === UserRoleEnum.PARTNER && branches.length > 1;
  function handleBranchChange(value: string) {
    setBranchId(value as UUID);
  }
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        {canChangeBranch ? (
          <Select defaultValue={BranchId} onValueChange={handleBranchChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <h1 className="text-lg font-bold text-primary">
            {branches.find((b) => b.id === BranchId)?.name}
          </h1>
        )}
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Users className="h-4 w-4" />
          {members} miembros
        </span>
      </div>
    </header>
  );
}
