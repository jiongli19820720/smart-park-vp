import { post } from "../utils/http/request";

interface LoginDate {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
  btnAuth: string[];
}

export function userLogin(data: LoginDate) {
  return post<LoginResponse>("login", data);
}
