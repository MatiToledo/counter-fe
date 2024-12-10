import { useStore } from "@/lib/state";
import { Branch } from "@/lib/types/models";
import { checkIfBranchIsOpen } from "@/utils/checkIfCanUpdateConcurrence";
import { useUser } from "./context/user";

export default function useBranchStatus() {
  const { selectedBranchId } = useStore();
  const { user } = useUser();
  const branch = user.Branches.find((b) => b.id === selectedBranchId);

  const isBranchOpen = checkIfBranchIsOpen(branch as Branch);

  return { isBranchOpen };
}
