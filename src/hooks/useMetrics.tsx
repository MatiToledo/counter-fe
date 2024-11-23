import { fetchApiGet } from "@/api/config";
import { UUID } from "crypto";
import useSWR from "swr";

export default function useMetrics(BranchId: UUID) {
  const { data, mutate } = useSWR(`/metrics/${BranchId}`, (url) =>
    fetchApiGet(url)
  );

  return { data: data?.result, mutate };
}
