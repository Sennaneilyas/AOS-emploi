import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * @param {{ children: import("react").ReactNode }} props
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, checking } = useAuth();
  const location = useLocation();

  // Still verifying token from localStorage — render nothing yet
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-soft">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
      </div>
    );
  }

  // Not logged in → redirect to /auth, remember where they were trying to go
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;