import { fetchGetConcurrence } from "@/api/endpoints/concurrence";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export default function useCounter(BranchId: UUID) {
  const [isLoading, setIsLoading] = useState(true);
  const [branchTotal, setBranchTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [entries, setEntries] = useState(0);
  const [exits, setExits] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    async function fetcher() {
      try {
        const res = await fetchGetConcurrence(BranchId);
        setTotal(res.total);
        setEntries(res.entries);
        setExits(res.exits);
        setBranchTotal(res.totalConcurrence);
        setIsLoading(false);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    fetcher();
  }, []);

  const updateStates = (type: "entry" | "exit", totalConcurrence: number) => {
    setBranchTotal(totalConcurrence);
    setTotal((prev) => (type === "entry" ? prev + 1 : prev - 1));
    if (type === "entry") setEntries((prev) => prev + 1);
    if (type === "exit") setExits((prev) => prev + 1);
  };

  return {
    updateStates,
    isLoading,
    total,
    entries,
    exits,
    branchTotal,
  };
}
