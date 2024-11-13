import { Branch } from "@/lib/types/models";
import { Fragment, useState } from "react";
import BranchForm from "../../forms/settings/branch";
import AddBranchDialog from "./add";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function BranchTab({ branches }: { branches: Branch[] }) {
  const [selectedBranch, setSelectedBranch] = useState<string>(branches[0]?.id);
  return (
    <Fragment>
      {branches.length > 1 && (
        <Select
          onValueChange={(value) => setSelectedBranch(value)}
          defaultValue={selectedBranch}>
          <SelectTrigger className="w-full mb-6">
            <SelectValue placeholder="Seleccione una sucursal" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sucursales</SelectLabel>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      <BranchForm
        branch={
          branches.find((b) => b.id === selectedBranch) as Branch
        }></BranchForm>
      <AddBranchDialog />
    </Fragment>
  );
}
