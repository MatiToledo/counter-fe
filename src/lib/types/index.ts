// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
}
