/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MetricCard from "../card";

export function EarningsPerHours({
  data,
  setCompareVs,
  compareVs,
  identifier,
}: any) {
  return (
    <MetricCard
      identifier={identifier}
      setCompareVs={setCompareVs}
      compareVs={compareVs}
      data={data}
      title="Total ganancias"
      xIdentifier="hour"
      yIdentifier="total"
      type={compareVs[identifier] ? "area" : "line"}></MetricCard>
  );
}
