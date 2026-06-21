import { post } from "../utils/http/request";

interface LoginDate {
  username: string;
  password: string;
}

export function userLogin(data: LoginDate) {
  return post("/login", data);
}
