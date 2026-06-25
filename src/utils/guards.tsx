import type { ReactNode } from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import type { RootState } from "../store";

type AuthGuardProps = {
  children: ReactNode;
  mode: "private" | "guest";
};

export function AuthGuard({ children, mode }: AuthGuardProps) {
  const token = useSelector((state: RootState) => state.auth.token);
  const isLogin = Boolean(token);

  if (mode === "private" && !isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (mode === "guest" && isLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
