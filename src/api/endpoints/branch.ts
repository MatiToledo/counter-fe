import { ApiResponse } from "@/lib/types";
import { Branch } from "@/lib/types/models";
import { fetchApiPatch, fetchApiPost } from "../config";
import { UUID } from "crypto";

export async function fetchCreateBranch(
  data: object
): Promise<ApiResponse<Branch>> {
  return await fetchApiPost("/branch", data);
}
export async function fetchUpdateBranch(
  id: UUID,
  data: object
): Promise<ApiResponse<Branch>> {
  return await fetchApiPatch(`/branch/${id}`, data);
}
