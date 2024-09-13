import { useContext } from "react";
import authContext from "../../store/authContext";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute() {
  const { isLogged } = useContext(authContext);
  return <>{isLogged ? <Outlet /> : <Navigate to="/"></Navigate>}</>;
}
