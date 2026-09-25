import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { routes } from "./routes";
import type { Role } from "../types/auth";

export default function ProtectedRoute({ allow }: { allow?: Role[] }) {
  const { state } = useAuth();
  const user = state.user;

  if (!user) return <Navigate to={routes.login} replace />;

  if (allow && !allow.includes(user.role)) return <Navigate to={routes.dashboard} replace />;

  return <Outlet />;
}
