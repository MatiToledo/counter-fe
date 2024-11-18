import { ApiResponse } from "@/lib/types";
import { Concurrence } from "@/lib/types/models";
import { fetchApiGet, fetchApiPatch } from "../config";
import { UUID } from "crypto";

export interface InitialConcurrence {
  total: number;
  entries: number;
  exits: number;
}

export async function fetchUpdateConcurrence(
  data: object
): Promise<ApiResponse<Concurrence>> {
  return await fetchApiPatch("/concurrence", data);
}

export async function fetchGetConcurrence(
  BranchId: UUID
): Promise<InitialConcurrence> {
  const res = await fetchApiGet(`/concurrence/${BranchId}`);
  return res.result;
}
