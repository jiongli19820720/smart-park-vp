import http from "./http";

interface ApiResPonse {
  code: number;
  message: string;
  data: unknown;
}
export function get(url: string, params?: unknown): Promise<ApiResPonse> {
  return http.get(url, { params });
}

export function post(url: string, data?: unknown): Promise<ApiResPonse> {
  return http.post(url, data);
}
