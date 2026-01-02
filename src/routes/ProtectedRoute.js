import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />; // not logged in
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />; // wrong role
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
