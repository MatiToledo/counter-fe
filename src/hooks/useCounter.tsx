import { fetchGetConcurrence } from "@/api/endpoints/concurrence";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export default function useCounter(BranchId: UUID) {
  const [total, setTotal] = useState(0);
  const [entries, setEntries] = useState(0);
  const [exits, setExits] = useState(0);

  useEffect(() => {
    async function fetcher() {
      try {
        const res = await fetchGetConcurrence(BranchId);
        setTotal(res.total);
        setEntries(res.entries);
        setExits(res.exits);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    fetcher();
  }, []);

  return {
    total,
    setTotal,
    entries,
    setEntries,
    exits,
    setExits,
  };
}
