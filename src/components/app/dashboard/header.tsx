"use client";
import { useStore } from "@/lib/state";
import { Branch } from "@/lib/types/models";
import { UUID } from "crypto";
import { usePathname } from "next/navigation";
import { DatePickerComponent } from "../../common/datePicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export default function DashboardHeader({ branches }: { branches: Branch[] }) {
  const { selectedBranchId, setSelectedBranchId } = useStore();

  const pathname = usePathname();
  const canChangeBranch = branches.length > 1;

  function handleBranchChange(value: string) {
    setSelectedBranchId(value as UUID);
  }

  return (
    <header className="flex items-center justify-between p-4 border-b w-full ">
      <div className="flex items-center gap-2">
        {canChangeBranch ? (
          <Select
            defaultValue={selectedBranchId}
            onValueChange={handleBranchChange}>
            <SelectTrigger className="w-auto gap-2">
              <SelectValue />
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
          <h1 className="text-lg font-bold text-primary">{branches[0].name}</h1>
        )}
      </div>
      {pathname === "/metrics" && (
        <DatePickerComponent param={"date"}></DatePickerComponent>
      )}
    </header>
  );
}
