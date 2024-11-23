"use client";
import { Branch, User } from "@/lib/types/models";
import { useState } from "react";
import UsersDashboard from "../metrics/users";
import DashboardHeader from "../header";
import { ConcurrenceActualPerHours } from "../metrics/concurrence/perHour";
import useMetrics from "@/hooks/useMetrics";
import { EntranceTypePerHours } from "../metrics/concurrence/perEntranceType";
import { EarningsPerHours } from "../metrics/concurrence/earningsPerHour";

export default function DashboardHomeComponent({ user }: { user: User }) {
  const [BranchId, setBranchId] = useState(user.Branches[0].id);
  const { data } = useMetrics(BranchId);
  console.log("data: ", data);
  const branch = user.Branches.find((b) => b.id === BranchId);

  return (
    <>
      <DashboardHeader
        branches={user.Branches}
        BranchId={BranchId}
        setBranchId={setBranchId}></DashboardHeader>
      {data && (
        <div className="max-h-[calc(100vh - 111px)] p-4 flex flex-col gap-4 overflow-y-auto w-full">
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
