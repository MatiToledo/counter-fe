/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MetricCard from "../card";

export function EntranceTypePerHours({
  data,
  compareVs,
  setCompareVs,
  identifier,
}: any) {
  return (
    <MetricCard
      data={data}
      compareVs={compareVs}
      setCompareVs={setCompareVs}
      identifier={identifier}
      title="Entradas por tipo"
      xIdentifier="type"
      yIdentifier="total"
      type="bar"></MetricCard>
  );
}
