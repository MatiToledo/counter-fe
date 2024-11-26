import { UUID } from "crypto";
import { fetchApiGet, fetchApiPatch } from "../config";

export interface InitialConcurrence {
  total: number;
  entries: number;
  exits: number;
  totalBranch: number;
}

export async function fetchUpdateConcurrence(
  data: object
): Promise<{ totalConcurrence: number }> {
  const res = await fetchApiPatch("/concurrence", data);
  return res.result;
}

export async function fetchGetConcurrenceByBranchAndUser(
  BranchId: UUID
): Promise<InitialConcurrence> {
  const res = await fetchApiGet(`/concurrence/branch/${BranchId}`);
  return res.result;
}
export async function fetchGetConcurrenceByBranch(
  BranchId: UUID
): Promise<InitialConcurrence> {
  const res = await fetchApiGet(`/concurrence/dashboard/branch/${BranchId}`);
  return res.result;
}
