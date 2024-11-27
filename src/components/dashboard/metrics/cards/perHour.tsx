/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Users } from "lucide-react";
import MetricCard from "../card";

export function ConcurrenceActualPerHours({
  data,
  maxCapacity,
  compareVs,
  setCompareVs,
  identifier,
}: any) {
  return (
    <MetricCard
      identifier={identifier}
      data={data}
      icon={<Users />}
      compareVs={compareVs}
      maxCapacity={maxCapacity}
      title="Concurrencia"
      setCompareVs={setCompareVs}
      xIdentifier="hour"
      yIdentifier="total"
      type={compareVs[identifier] ? "area" : "line"}></MetricCard>
  );
}
