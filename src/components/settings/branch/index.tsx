import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Branch } from "@/lib/types/models";
import { UUID } from "crypto";
import { Fragment } from "react";
import BranchForm from "../../forms/settings/branch";
import AddBranchDialog from "./add";
import { useStore } from "@/lib/state";
export default function BranchTab({ branches }: { branches: Branch[] }) {
  const { selectedBranchId, setSelectedBranchId } = useStore();
  return (
    <Fragment>
      {branches.length > 1 && (
        <Select
          onValueChange={(value) => setSelectedBranchId(value as UUID)}
          value={selectedBranchId}>
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
          branches.find((b) => b.id === selectedBranchId) as Branch
        }></BranchForm>
      <AddBranchDialog />
    </Fragment>
  );
}
