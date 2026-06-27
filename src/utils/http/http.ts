import { message } from "antd";
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

import { store } from "../../store";
import { API_BASE_URL } from "../../config/env";

const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// 请求拦截器
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
http.interceptors.response.use((response: AxiosResponse) => {
  const data = response.data;
  if (data.code != 200) {
    message.error(data.code + ":" + data.message);
    return Promise.reject(new Error(data.message));
  }
  if (response.config.url?.includes("/login")) {
    message.success(data.message || "登录成功");
  }
  return data;
});

export default http;
