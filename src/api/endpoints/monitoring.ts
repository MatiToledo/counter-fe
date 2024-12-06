import { Monitoring } from "@/lib/types/models";
import { fetchApiGet, fetchApiPost } from "../config";
import { ApiResponse } from "@/lib/types";
import { UUID } from "crypto";

export async function fetchCreateMonitoring(
  body: object
): Promise<ApiResponse<Monitoring>> {
  const res = await fetchApiPost("/monitoring", body);
  return res;
}

export async function fetchGetLatestMonitoring(
  BranchId: UUID
): Promise<Monitoring> {
  const res = await fetchApiGet(`/monitoring/branch/${BranchId}/latest`);
  return res.result;
}
