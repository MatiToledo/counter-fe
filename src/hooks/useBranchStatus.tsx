import { useSelectedBranchStore } from "@/lib/state";
import { useUser } from "./context/user";
import { Branch } from "@/lib/types/models";
import { checkIfBranchIsOpen } from "@/utils/checkIfCanUpdateConcurrence";

export default function useBranchStatus() {
  const selectedBranch = useSelectedBranchStore(
    (state) => state.selectedBranch
  );
  const { user } = useUser();
  const branch = user.Branches.find((b) => b.id === selectedBranch);

  const isBranchOpen = checkIfBranchIsOpen(branch as Branch);

  return { isBranchOpen };
}
