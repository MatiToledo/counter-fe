import { ApiResponse } from "@/lib/types";
import { fetchApiPost } from "../config";
import { Alert } from "@/lib/types/models";

export async function fetchCreateAlert(
  body: object
): Promise<ApiResponse<Alert>> {
  const res = await fetchApiPost(`/alert`, body);
  return res.result;
}
