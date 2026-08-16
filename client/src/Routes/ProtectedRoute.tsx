import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import type { Users } from "../Types";
export default function ProtectedRouter() {
  const user = useSelector((state:  { login: { user: Users | null } }) => state.login.user);
  console.log(user);
  return <>{user?.id ? <Outlet /> : <Navigate to="/" />}</>;
}
