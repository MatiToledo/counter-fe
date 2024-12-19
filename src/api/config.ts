/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_API_URL } from "@/lib/constants";
import { getLSToken } from "@/lib/localStorage";
import { ApiResponse, MethodType } from "@/lib/types";

export async function fetchAPI(path: RequestInfo, config: object) {
  const url = BASE_API_URL + path;

  const fullConfig = {
    ...config,
  };
  const res = await fetch(url, fullConfig);

  const status = res.status;
  const resJson = await res.json();
  // return resJson;
  if (status >= 400) throw new Error(resJson.message);
  if (status >= 200 && status < 300) return resJson;
}

function setConfig(method: MethodType, body?: object) {
  const token = getLSToken();
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `bearer ${token}` : "",
    },
    body: body ? JSON.stringify({ ...body }) : null,
  };
  return config;
}

export async function fetchApiPost(
  path: string,
  body?: object
): Promise<ApiResponse<any>> {
  return await fetchAPI(path, setConfig("POST", body));
}
export async function fetchApiPatch(
  path: string,
  body?: object
): Promise<ApiResponse<any>> {
  return await fetchAPI(path, setConfig("PATCH", body));
}
export async function fetchApiPut(
  path: string,
  body?: object
): Promise<ApiResponse<any>> {
  return await fetchAPI(path, setConfig("PUT", body));
}

export async function fetchApiGet(path: string): Promise<ApiResponse<any>> {
  return await fetchAPI(path, setConfig("GET"));
}
export async function fetchApiDelete(path: string): Promise<ApiResponse<any>> {
  return await fetchAPI(path, setConfig("DELETE"));
}
