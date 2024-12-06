import { fetchGetLatestMonitoring } from "@/api/endpoints/monitoring";
import { Monitoring } from "@/lib/types/models";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export default function useLatestMonitoring(BranchId: UUID) {
  const [latestMonitoring, setLatestMonitoring] = useState<Monitoring>();

  useEffect(() => {
    async function fetcher() {
      try {
        const res = await fetchGetLatestMonitoring(BranchId);
        setLatestMonitoring(res);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    fetcher();
  }, [BranchId]);

  return { latestMonitoring };
}
