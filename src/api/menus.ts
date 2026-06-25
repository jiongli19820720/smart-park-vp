import { get } from "../utils/http/request";
import type { ApiMenuItem } from "../utils/transformMenuItems";

export function getMenuList() {
  return get<ApiMenuItem[]>("menu");
}
