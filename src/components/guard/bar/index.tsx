import LatestAlerts from "@/components/dashboard/home/alerts";
import { User } from "@/lib/types/models";
import { GuardBarAlert } from "./alert";
import Monitoring from "./monitoring";

export default function GuardBarComponent({ user }: { user: User }) {
  const branch = user.Branches[0];
  return (
    <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] overflow-auto text-white flex flex-col items-center p-4 pb-6 gap-4">
      <Monitoring BranchId={branch.id} />
      <LatestAlerts
        BranchId={branch.id}
        userFullName={user.fullName}></LatestAlerts>
      <GuardBarAlert BranchId={branch.id} />
    </div>
  );
}
