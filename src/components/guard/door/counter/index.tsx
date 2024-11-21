/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { fetchUpdateConcurrence } from "@/api/endpoints/concurrence";
import { useToast } from "@/hooks/use-toast";
import useCounter from "@/hooks/useCounter";
import { UUID } from "crypto";
import { useState } from "react";
import { Buttons } from "./buttons";
import { Display } from "./display";
import { Branch } from "@/lib/types/models";
import checkIfCanUpdateConcurrence from "@/utils/checkIfCanUpdateConcurrence";
import toastError from "@/utils/toastError";

export default function CounterComponent({ branch }: { branch: Branch }) {
  const { id: BranchId, maxCapacity, opening, closing, timeZone } = branch;
  const { toast } = useToast();
  const { isLoading, total, entries, exits, branchTotal, updateStates } =
    useCounter(BranchId);
  const [showEntryTypes, setShowEntryTypes] = useState(false);
  const canUpdateConcurrence = (type: "entry" | "exit") => {
    return checkIfCanUpdateConcurrence(type, branchTotal, branch, toast);
  };

  const handleExit = async () => {
    if (!canUpdateConcurrence("exit")) return;

    try {
      const result = await fetchUpdateConcurrence({ BranchId, type: "exit" });
      updateStates("exit", result.totalConcurrence);
    } catch (error: any) {
      toastError(toast, error.message);
    }
  };

  const handleEntry = async (type?: string) => {
    if (!canUpdateConcurrence("entry")) return;

    try {
      const body = {
        BranchId,
        type: "entry",
        ...(type && { entranceType: type }),
      };
      const result = await fetchUpdateConcurrence(body);
      updateStates("entry", result.totalConcurrence);
      setShowEntryTypes(false);
    } catch (error: any) {
      toastError(toast, error.message);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-between flex-col flex-1">
      <div className="w-full max-w-xs flex flex-col items-center">
        {!isLoading && (
          <Display
            total={total}
            branchTotal={branchTotal}
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
