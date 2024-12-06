import { ApiResponse } from "@/lib/types";
import { User } from "@/lib/types/models";
import { UUID } from "crypto";
import { fetchApiDelete, fetchApiGet, fetchApiPatch } from "../config";

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

export async function fetchDeleteUser(id: UUID): Promise<ApiResponse<User>> {
  return await fetchApiDelete(`/user/${id}`);
}
