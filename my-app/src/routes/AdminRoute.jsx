import LoginAdmin from "@pages/admin/Login";
import AdminLayout from "@components/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import PublicRoute from "../components/guard/PublicRoute";
import ProtectedRoute from "../components/guard/ProtectedRoute";

const adminRoutes = [
  {
    element: <PublicRoute />,
    children: [{ path: "/admin/auth/login", element: <LoginAdmin /> }],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },
];
export default adminRoutes;
