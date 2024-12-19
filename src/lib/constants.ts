const BASE_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3080/v1"
    : "https://flowlyinfo.com:3080/v1";
//   export const BASE_API_URL = "https://flowlyinfo.com:3080/v1";
//   export const BASE_API_URL = "http://10.0.2.2:3080/v1";

const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3080"
    : "https://flowlyinfo.com:3080";
// const SOCKET_URL = "https://flowlyinfo.com:3080";
// const SOCKET_URL = "ws://10.0.2.2:3080";

export { BASE_API_URL, SOCKET_URL };
