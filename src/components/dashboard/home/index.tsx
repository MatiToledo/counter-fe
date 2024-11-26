"use client";
import { CounterDisplay } from "@/components/guard/door/counter/display";
import useCounter from "@/hooks/useCounter";
import useMetrics from "@/hooks/useMetrics";
import { useSelectedBranchStore } from "@/lib/state";
import { User } from "@/lib/types/models";
import DashboardHeader from "../header";
import LatestAlerts from "./alerts";

export default function DashboardHomeComponent({ user }: { user: User }) {
  const selectedBranch = useSelectedBranchStore(
    (state) => state.selectedBranch
  );
  const setSelectedBranch = useSelectedBranchStore(
    (state) => state.setSelectedBranch
  );
  const { isLoading, total, entries, exits, totalBranch } = useCounter(
    selectedBranch,
    user.id,
    "partner"
  );

  const branch = user.Branches.find((b) => b.id === selectedBranch);

  return (
    <>
      <DashboardHeader
        branches={user.Branches}
        BranchId={selectedBranch}
        setBranchId={setSelectedBranch}></DashboardHeader>
      {!isLoading && (
        <div className="min-h-[calc(100vh-111px)] max-h-[calc(100vh-111px)] p-4 flex flex-col gap-4 overflow-y-auto w-full items-center">
          {!isLoading && (
            <CounterDisplay
              total={total}
              totalBranch={totalBranch}
              entries={entries}
              exits={exits}
              maxCapacity={branch?.maxCapacity as number}
            />
          )}
          <LatestAlerts BranchId={selectedBranch}></LatestAlerts>
        </div>
      )}
    </>
  );
}
