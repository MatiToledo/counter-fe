"use client";
import { Branch } from "@/lib/types/models";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePickerComponent } from "../datePicker";

export default function DashboardHeader({
  branches,
  BranchId,
  setBranchId,
}: {
  branches: Branch[];
  BranchId: UUID;
  setBranchId: Dispatch<SetStateAction<UUID>>;
}) {
  const canChangeBranch = branches.length > 1;

  function handleBranchChange(value: string) {
    setBranchId(value as UUID);
  }

  return (
    <header className="flex items-center justify-between p-4 border-b w-full">
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
          <h1 className="text-lg font-bold text-primary">{branches[0].name}</h1>
        )}
      </div>
    </header>
  );
}
