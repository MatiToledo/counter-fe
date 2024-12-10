/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { socket } from "@/api/socket";
import useCounter from "@/hooks/useCounter";
import { UUID } from "crypto";
import { useState } from "react";
import { Buttons } from "./buttons";
import { CounterDisplay } from "./display";
import LatestAlerts from "@/components/dashboard/home/alerts";
type CounterComponentProps = {
  BranchId: UUID;
  UserId: UUID;
  maxCapacity: number;
};

export default function CounterComponent({
  BranchId,
  maxCapacity,
  UserId,
}: CounterComponentProps) {
  const [showEntryTypes, setShowEntryTypes] = useState(false);
  const { isLoading, total, entries, exits, totalBranch } = useCounter(
    BranchId,
    UserId,
    "user"
  );

  const handleExit = async () => {
    socket.emit("concurrence", { BranchId, type: "exit" });
  };

  const handleEntry = async (type?: string) => {
    const body = {
      BranchId,
      type: "entry",
      ...(type && { entranceType: type }),
    };
    socket.emit("concurrence", body);
    setShowEntryTypes(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-between flex-col flex-1 gap-4">
      <div className="w-full max-w-xs flex flex-col items-center">
        {!isLoading && (
          <CounterDisplay
            total={total}
            totalBranch={totalBranch}
            entries={entries}
            exits={exits}
            maxCapacity={maxCapacity}
          />
        )}
      </div>

      <div className="w-full max-w-xs flex flex-col">
        <Buttons
          onExit={handleExit}
          onEntry={handleEntry}
          showEntryTypes={showEntryTypes}
          setShowEntryTypes={setShowEntryTypes}
        />
      </div>
    </div>
  );
}
