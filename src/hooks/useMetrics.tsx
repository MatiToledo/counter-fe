/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fetchApiGet } from "@/api/config";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useMetrics(branchId: string) {
  const [entries, setEntries] = useState<any>();
  const [earnings, setEarnings] = useState<any>();
  const [typeEntries, setTypeEntries] = useState<any>();
  const [peopleInBars, setPeopleInBars] = useState<any>();
  const [peopleInDance, setPeopleInDance] = useState<any>();
  const searchParams = useSearchParams();

  const date = searchParams.get("date") || "";
  const entriesVs = searchParams.get("entriesVs") || "";
  const earningVs = searchParams.get("earningVs") || "";
  const typeEntriesVs = searchParams.get("typeEntriesVs") || "";
  const peopleInBarsVs = searchParams.get("peopleInBarsVs") || "";
  const peopleInDanceVs = searchParams.get("peopleInDanceVs") || "";

  // const { data, isLoading } = useSWR(
  //   `/metrics/branch/${branchId}?date=${date}&entriesVs=${entriesVs}&earningVs=${earningVs}&typeEntriesVs=${typeEntriesVs}`,
  //   fetchApiGet,
  //   {
  //     keepPreviousData: true,
  //   }
  // );

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res: any = await fetchApiGet(
          `/metrics/branch/${branchId}?date=${date}&entriesVs=${entriesVs}&earningVs=${earningVs}&typeEntriesVs=${typeEntriesVs}&peopleInBarsVs=${peopleInBarsVs}&peopleInDanceVs=${peopleInDanceVs}`
        );

        if (res) {
          setEntries(res.result.entries);
          setEarnings(res.result.earnings);
          setTypeEntries(res.result.typeEntries);
          setPeopleInBars(res.result.peopleInBars);
          setPeopleInDance(res.result.peopleInDance);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, [
    date,
    entriesVs,
    earningVs,
    typeEntriesVs,
    peopleInBarsVs,
    peopleInDanceVs,
  ]);

  return {
    // data: data?.result,
    entries,
    earnings,
    peopleInBars,
    typeEntries,
    peopleInDance,
    params: { date, entriesVs, earningVs, typeEntriesVs },
  };
}
