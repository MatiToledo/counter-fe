/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Fragment, useState } from "react";
import { Buttons } from "./buttons";
import { Display } from "./display";

export default function CounterComponent() {
  const [total, setTotal] = useState(0);
  const [entries, setEntries] = useState(0);
  const [exits, setExits] = useState(0);
  const [showEntryTypes, setShowEntryTypes] = useState(false);
  const [maxCapacity, setMaxCapacity] = useState(100);

  const handleExit = () => {
    if (total > 0) {
      setTotal((prev) => prev - 1);
      setExits((prev) => prev + 1);
    }
  };

  const handleEntry = (type?: string) => {
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
