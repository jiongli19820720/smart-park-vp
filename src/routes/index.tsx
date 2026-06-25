import { createBrowserRouter } from "react-router-dom";

import { AuthGuard } from "../utils/guards";
import { Home, Login, NotFound } from "./lazyPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard mode="private">
        <Home />
      </AuthGuard>
    ),
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
