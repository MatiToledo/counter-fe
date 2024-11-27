import { fetchApiGet } from "@/api/config";
import { UUID } from "crypto";
import { useState } from "react";
import useSWR from "swr";

export default function useMetrics(BranchId: UUID) {
  const [date, setDate] = useState<Date | undefined>();
  const [compareVs, setCompareVs] = useState<object>({
    entriesPerHour: false,
    earningsPerHour: false,
    typeEntries: false,
  });

  const { data, mutate, isLoading } = useSWR(
    `/metrics/branch/${BranchId}?date=${date || ""}
    &compareVs=${JSON.stringify(compareVs)}`,
    (url) => fetchApiGet(url),
    {
      keepPreviousData: true,
    }
  );

  return {
    data: data?.result || null,
    mutate,
    setDate,
    date,
    isLoading,
    compareVs,
    setCompareVs,
  };
}
