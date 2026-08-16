import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { Users } from "../Types";

export default function PublicRoute() {
  const user = useSelector((state:  { login: { user: Users | null } }) => state.login.user);

  if (user?.id) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}