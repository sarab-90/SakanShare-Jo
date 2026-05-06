import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext.jsx";

const OnboardingGuard = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;


  if (user && user.onboarding_completed === false) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default OnboardingGuard;