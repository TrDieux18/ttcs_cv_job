import { useEffect, useState } from "react";
import { verifyToken } from "@services/admin/AuthService";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await verifyToken();
        if (res.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl ">Loading...</p>
      </div>
    );
  if (!isAuthenticated) return <Navigate to="/admin/auth/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
