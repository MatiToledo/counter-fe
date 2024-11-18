/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Fragment, useState } from "react";
import { Buttons } from "./buttons";
import { Display } from "./display";
import { useToast } from "@/hooks/use-toast";
import { fetchUpdateConcurrence } from "@/api/endpoints/concurrence";
import { UUID } from "crypto";
import useCounter from "@/hooks/useCounter";

export default function CounterComponent({
  BranchId,
  maxCapacity,
}: {
  BranchId: UUID;
  maxCapacity: number;
}) {
  const { toast } = useToast();
  const { total, setTotal, entries, setEntries, exits, setExits } =
    useCounter(BranchId);
  const [showEntryTypes, setShowEntryTypes] = useState(false);

  const handleExit = async () => {
    if (total > 0) {
      await fetchUpdateConcurrence({ BranchId, type: "exit" });
      setTotal((prev) => prev - 1);
      setExits((prev) => prev + 1);
    }
  };

  const handleEntry = async (type?: string) => {
    if (total === maxCapacity) {
      toast({
        variant: "destructive",
        title: "No se puede superar la capacidad maxima",
      });
      return;
    }
    const body = {
      BranchId,
      type: "entry",
      ...(type && { entranceType: type }),
    };
    await fetchUpdateConcurrence(body);
    setTotal((prev) => prev + 1);
    setEntries((prev) => prev + 1);
    setShowEntryTypes(false);
  };

  const occupancyPercentage = (total / maxCapacity) * 100;

  return (
    <div className="w-full h-full flex items-center justify-between flex-col flex-1">
      <div className="w-full max-w-xs flex flex-col items-center">
        <Display
          total={total}
          entries={entries}
          exits={exits}
          occupancyPercentage={occupancyPercentage}
          maxCapacity={maxCapacity}
        />
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
