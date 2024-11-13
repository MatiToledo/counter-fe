import { ApiResponse } from "@/lib/types";
import { User } from "@/lib/types/models";
import { UUID } from "crypto";
import { fetchApiGet, fetchApiPatch } from "../config";

export async function fetchGetMe(): Promise<User> {
  const fetch = await fetchApiGet("/user/me");
  return fetch.result;
}

export async function fetchUpdateUser(
  id: UUID,
  data: object
): Promise<ApiResponse<User>> {
  return await fetchApiPatch(`/user/${id}`, data);
}
