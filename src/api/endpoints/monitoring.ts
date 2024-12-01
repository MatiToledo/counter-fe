import { Monitoring } from "@/lib/types/models";
import { fetchApiPost } from "../config";
import { ApiResponse } from "@/lib/types";

export async function fetchCreateMonitoring(
  body: object
): Promise<ApiResponse<Monitoring>> {
  const res = await fetchApiPost("/monitoring", body);
  return res;
}
