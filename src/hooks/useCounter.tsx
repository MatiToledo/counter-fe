/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  fetchGetConcurrenceByBranch,
  fetchGetConcurrenceByBranchAndUser,
} from "@/api/endpoints/concurrence";
import { socket } from "@/api/socket";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";

export default function useCounter(
  BranchId: UUID,
  UserId: UUID,
  type: "user" | "partner"
) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [totalBranch, setTotalBranch] = useState(0);
  const [total, setTotal] = useState(0);
  const [entries, setEntries] = useState(0);
  const [exits, setExits] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    async function fetcher() {
      try {
        let res;
        if (type === "user") {
          res = await fetchGetConcurrenceByBranchAndUser(BranchId);
        } else {
          res = await fetchGetConcurrenceByBranch(BranchId);
        }
        setTotal(res.total);
        setEntries(res.entries);
        setExits(res.exits);
        setTotalBranch(res.totalBranch);
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error al obtener el aforo inicial",
        });
      }
    }
    fetcher();
  }, []);

  socket?.on("concurrence", (result: any) => {
    if (type !== "user") return;
    const isYou = result.UserId === UserId;
    if (isYou) {
      setTotal(result.entries - result.exits);
      setExits(result.exits);
      setEntries(result.entries);
    }
    setTotalBranch(result.totalBranch);
  });

  socket?.on("concurrence_partner", (result: any) => {
    if (type !== "partner") return;

    setTotal(result.entries - result.exits);
    setExits(result.exits);
    setEntries(result.entries);
    setTotalBranch(result.totalBranch);
  });

  socket?.on("error", (error: string) => {
    toast({
      variant: "destructive",
      title: error,
    });
  });

  return {
    isLoading,
    total,
    entries,
    exits,
    totalBranch,
  };
}
