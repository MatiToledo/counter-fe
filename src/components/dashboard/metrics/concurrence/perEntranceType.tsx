/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MetricCard from "../card";

export function EntranceTypePerHours({ data }: any) {
  return (
    <MetricCard
      data={data}
      title="Entradas por tipo"
      xIdentifier="type"
      yIdentifier="total"
      type="bar"></MetricCard>
  );
}
