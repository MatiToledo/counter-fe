"use client";
import useMetrics from "@/hooks/useMetrics";
import { useSelectedBranchStore } from "@/lib/state";
import { Branch, User } from "@/lib/types/models";
import { EarningsPerHours } from "./earningsPerHour";
import { EntranceTypePerHours } from "./perEntranceType";
import { ConcurrenceActualPerHours } from "./perHour";
import UsersDashboard from "./users";
import DashboardHeader from "../header";

export default function MetricsComponent({ user }: { user: User }) {
  const selectedBranch = useSelectedBranchStore(
    (state) => state.selectedBranch
  );
  const setSelectedBranch = useSelectedBranchStore(
    (state) => state.setSelectedBranch
  );
  const { data } = useMetrics(selectedBranch);
  const branch = user.Branches.find((b) => b.id === selectedBranch);

  return (
    <>
      <DashboardHeader
        branches={user.Branches}
        BranchId={selectedBranch}
        setBranchId={setSelectedBranch}></DashboardHeader>
      {data && (
        <div className="min-h-[calc(100vh-101px)] max-h-[calc(100vh-101px)] overflow-auto text-white flex flex-col items-center p-4 pb-6 gap-4 ">
          <ConcurrenceActualPerHours
            data={data.entriesPerHour}
            maxCapacity={branch?.maxCapacity}></ConcurrenceActualPerHours>
          <EarningsPerHours data={data.earningsPerHour}></EarningsPerHours>
          <EntranceTypePerHours data={data.typeEntries}></EntranceTypePerHours>
          <UsersDashboard
            branch={branch as Branch}
            UserId={user.id}></UsersDashboard>
        </div>
      )}
    </>
  );
}
