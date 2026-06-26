import { createBrowserRouter } from "react-router-dom";
import { map } from "remeda";

import { AuthGuard } from "../utils/guards";
import { Home, Login, MenuPlaceholder, NotFound } from "./lazyPages";

const menuRoutes = [
  "/dashboard",
  "/users",
  "/users/list",
  "/users/add",
  "/estate",
  "/estate/tenement",
  "/estate/room",
  "/estate/car",
  "/repair",
  "/finance",
  "/finance/contract",
  "/finance/surrender",
  "/finance/bill",
  "/merchants",
  "/operation",
  "/operation/all",
  "/operation/article",
  "/operation/comments",
  "/equipment",
  "/energy",
  "/settings",
  "/personal",
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard mode="private">
        <Home />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <MenuPlaceholder />,
      },
      // 根据菜单接口可能返回的 key 预注册占位路由，后续真实页面会逐个替换 element。
      ...map(menuRoutes, (path) => ({
        path,
        element: <MenuPlaceholder />,
      })),
    ],
  },
  {
    path: "/login",
    element: (
      <AuthGuard mode="guest">
        <Login />
      </AuthGuard>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
