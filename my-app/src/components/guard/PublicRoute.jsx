import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { verifyToken } from "@services/admin/AuthService";

const PublicRoute = () => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await verifyToken();
        setIsAuthenticated(res.success);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [location.pathname]);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};
export default PublicRoute;
