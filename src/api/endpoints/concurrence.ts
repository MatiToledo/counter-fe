import { UUID } from "crypto";
import { fetchApiGet, fetchApiPatch } from "../config";

export interface InitialConcurrence {
  total: number;
  entries: number;
  exits: number;
  totalConcurrence: number;
}

export async function fetchUpdateConcurrence(
  data: object
): Promise<{ totalConcurrence: number }> {
  const res = await fetchApiPatch("/concurrence", data);
  return res.result;
}

export async function fetchGetConcurrence(
  BranchId: UUID
): Promise<InitialConcurrence> {
  const res = await fetchApiGet(`/concurrence/${BranchId}`);
  return res.result;
}
