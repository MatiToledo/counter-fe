/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse, MethodType } from "@/lib/types";

export async function fetchAPI(path: RequestInfo, config: object) {
  const BASE_API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3080/v1"
      : "https://api.pul.com.ar:443/v1";
  // const BASE_API_URL = "http://10.0.2.2:3080/v1";
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

function getCookieToken(cookieName: string): string | null {
  const match = document.cookie.match(
    new RegExp("(^| )" + cookieName + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

function setConfig(method: MethodType, body?: object) {
  const token = getCookieToken("token"); // Usa "token" como el nombre de la cookie
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
