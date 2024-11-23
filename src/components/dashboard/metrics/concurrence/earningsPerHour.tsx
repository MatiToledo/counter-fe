/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DollarSign } from "lucide-react";
import MetricCard from "../card";

export function EarningsPerHours({ data }: any) {
  return (
    <MetricCard
      data={data}
      title="Total ganancias"
      xIdentifier="hour"
      yIdentifier="total"
      type="line"></MetricCard>
  );
}
