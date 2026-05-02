import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role?.trim().toLowerCase();

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;