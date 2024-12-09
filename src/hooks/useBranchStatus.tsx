import { getLSBranchId } from "@/lib/localStorage";
import { Branch } from "@/lib/types/models";
import { checkIfBranchIsOpen } from "@/utils/checkIfCanUpdateConcurrence";
import { useUser } from "./context/user";

export default function useBranchStatus() {
  const selectedBranch = getLSBranchId();
  const { user } = useUser();
  const branch = user.Branches.find((b) => b.id === selectedBranch);

  const isBranchOpen = checkIfBranchIsOpen(branch as Branch);

  return { isBranchOpen };
}
