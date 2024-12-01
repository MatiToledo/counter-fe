import { fetchApiGet } from "../config";

export async function fetchGetMetricsByBranch(url: string) {
  const fetch = await fetchApiGet(url);
  return fetch.result;
}
