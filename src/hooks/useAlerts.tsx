import { fetchApiGet } from "@/api/config";
import { UUID } from "crypto";
import useSWR from "swr";
import { useSocket } from "./context/socket";

export default function useAlerts(BranchId: UUID) {
  const { socket } = useSocket();
  const { data, mutate } = useSWR(`/alert/branch/${BranchId}`, (url) =>
    fetchApiGet(url)
  );

  socket?.on("newAlert", () => {
    mutate();
  });

  return { data };
}
