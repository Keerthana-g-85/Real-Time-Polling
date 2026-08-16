import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const user = useSelector((state: any) => state.login.user);

  if (user?.id) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}