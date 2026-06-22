import { message } from "antd";
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const http: AxiosInstance = axios.create({
  baseURL: "https://www.demo.com",
  timeout: 5000,
});

// 请求拦截器
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log("请求拦截器", config.data);
  return config;
});

// 响应拦截器
http.interceptors.response.use((response: AxiosResponse) => {
  console.log("响应拦截器", response.data);
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
