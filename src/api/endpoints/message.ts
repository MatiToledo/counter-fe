import { Message } from "@/lib/types/models";
import { fetchApiGet } from "../config";
import { UUID } from "crypto";

export async function fetchGetMessagesByBranchId(
  BranchId: UUID,
  page: number
): Promise<{ rows: Message[]; count: number }> {
  const fetch = await fetchApiGet(`/message/${BranchId}?limit=15&page=${page}`);
  return fetch.result;
}
