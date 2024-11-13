/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRoleEnum, UserSubRoleEnum } from "@/lib/types/enums";
import { fetchApiPatch, fetchApiPost } from "../config";

export async function fetchLogIn(
  body: object
): Promise<{ token: string; role: UserRoleEnum; subRole: UserSubRoleEnum }> {
  const fetch = await fetchApiPost("/auth/logIn", body);
  return fetch.result;
}

export async function fetchLogUp(body: object): Promise<any> {
  return await fetchApiPost("/auth", body);
}

export async function fetchUpdatePassword(body: object): Promise<any> {
  return await fetchApiPatch("/auth/password", body);
}
