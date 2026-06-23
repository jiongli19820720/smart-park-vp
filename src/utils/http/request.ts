import http from "./http";

interface ApiResPonse<TData = unknown> {
  code: number;
  message: string;
  data: TData;
}
export function get<TData = unknown>(url: string, params?: unknown): Promise<ApiResPonse<TData>> {
  return http.get(url, { params });
}

export function post<TData = unknown>(url: string, data?: unknown): Promise<ApiResPonse<TData>> {
  return http.post(url, data);
}
