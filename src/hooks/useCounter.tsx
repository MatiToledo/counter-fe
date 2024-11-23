/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGetConcurrence } from "@/api/endpoints/concurrence";
import { socket } from "@/api/socket";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export default function useCounter(BranchId: UUID, UserId: UUID) {
  const [isLoading, setIsLoading] = useState(true);
  const [totalBranch, setTotalBranch] = useState(0);
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
        setTotalBranch(res.totalConcurrence);
        setIsLoading(false);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    fetcher();
  }, []);

  socket.on("concurrence", (result: any) => {
    const isYou = result.UserId === UserId;
    if (isYou) {
      setTotal(result.entries - result.exits);
      setExits(result.exits);
      setEntries(result.entries);
    }
    setTotalBranch(result.totalBranch);
  });

  return {
    isLoading,
    total,
    entries,
    exits,
    totalBranch,
  };
}
