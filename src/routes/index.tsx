import { createBrowserRouter } from "react-router-dom";

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
      ...menuRoutes.map((path) => ({
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
