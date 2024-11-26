import { fetchApiGet } from "@/api/config";
import { socket } from "@/api/socket";
import { UUID } from "crypto";
import useSWR from "swr";

export default function useAlerts(BranchId: UUID) {
  const { data, mutate } = useSWR(`/alert/branch/${BranchId}`, (url) =>
    fetchApiGet(url)
  );

  socket?.on("newAlert", () => {
    console.log("nueva alerta");
    mutate();
  });

  return { data };
}
