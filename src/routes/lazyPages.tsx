import { lazy } from "react";

export const Home = lazy(() => import("../pages/dashboard"));
export const Login = lazy(() => import("../pages/login"));
export const NotFound = lazy(() => import("../pages/notFound"));
