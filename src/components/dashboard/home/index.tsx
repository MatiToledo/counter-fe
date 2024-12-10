"use client";
import { CounterDisplay } from "@/components/guard/door/counter/display";
import useCounter from "@/hooks/useCounter";
import { useStore } from "@/lib/state";
import { User } from "@/lib/types/models";
import DashboardHeader from "../header";
import LatestAlerts from "./alerts";
import Monitoring from "./monitoring";

export default function DashboardHomeComponent({ user }: { user: User }) {
  const { selectedBranchId } = useStore();

  const { isLoading, total, entries, exits, totalBranch } = useCounter(
    selectedBranchId,
    user.id,
    "partner"
  );

  const branch = user.Branches.find((b) => b.id === selectedBranchId);

  return (
    <>
      <DashboardHeader branches={user.Branches}></DashboardHeader>
      {!isLoading && (
        <div className="min-h-[calc(100vh-111px)] max-h-[calc(100vh-111px)] p-4 flex flex-col gap-4 overflow-y-auto w-full items-center">
          <div className="w-full items-center flex flex-col ">
            {!isLoading && (
              <CounterDisplay
                total={total}
                totalBranch={totalBranch}
                entries={entries}
                exits={exits}
                maxCapacity={branch?.maxCapacity as number}
              />
            )}
          </div>
          <Monitoring BranchId={selectedBranchId} />
          <LatestAlerts
            BranchId={selectedBranchId}
            userFullName={user.fullName}
          />
        </div>
      )}
    </>
  );
}
