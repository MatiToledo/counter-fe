import { fetchApiGet } from "@/api/config";
import { UUID } from "crypto";
import useSWR from "swr";

export default function useMonitoring(BranchId: UUID) {
  const { data, mutate } = useSWR(
    `/monitoring/branch/${BranchId}`,
    (url) => fetchApiGet(url),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );
  return {
    alreadyExists: data?.result.alreadyExists,
    nextUpdateOn: data?.result.nextUpdateOn,
    mutate,
  };
}
