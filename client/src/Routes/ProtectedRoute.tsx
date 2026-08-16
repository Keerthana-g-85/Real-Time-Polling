import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
export default function ProtectedRouter() {
  const user = useSelector((state: any) => state.login.user);
  console.log(user);
  return <>{user?.id ? <Outlet /> : <Navigate to="/" />}</>;
}
