import { Message } from "@/lib/types/models";
import { fetchApiGet } from "../config";
import { UUID } from "crypto";

// export async function fetchGetMessagesByBranchId(
//   BranchId: UUID,
//   page: number
// ): Promise<{ rows: Message[]; count: number }> {
//   const fetch = await fetchApiGet(`/message/${BranchId}?limit=15&page=${page}`);
//   return fetch.result;
// }
export async function fetchGetMessagesByBranchId(
  url: string
): Promise<{ rows: Message[]; count: number; haveNextPage: boolean }> {
  const fetch = await fetchApiGet(url);
  return fetch.result;
}
