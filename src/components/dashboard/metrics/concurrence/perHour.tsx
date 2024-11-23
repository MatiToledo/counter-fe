/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Users } from "lucide-react";
import MetricCard from "../card";

export function ConcurrenceActualPerHours({ data, maxCapacity }: any) {
  return (
    <MetricCard
      data={data}
      icon={<Users />}
      maxCapacity={maxCapacity}
      title="Concurrencia"
      xIdentifier="hour"
      yIdentifier="total"
      type="line"></MetricCard>
  );
}
