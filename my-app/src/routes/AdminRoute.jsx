import LoginAdmin from "@pages/admin/Login";
import AdminLayout from "@components/layout/AdminLayout";
import Dashboard from "@pages/admin/Dashboard";
import PublicRoute from "@components/guard/PublicRoute";
import ProtectedRoute from "@components/guard/ProtectedRoute";
import User from "@pages/admin/User";
import Role from "@pages/admin/Role";
import UserForm from "@pages/admin/User/components/UserForm";
import DetailUser from "@pages/admin/User/components/DetailUser";
import RolePermission from "@pages/admin/Role/components/RolePermission";
import CV from "@pages/admin/CV";

import CreateCV from "@pages/admin/CV/CreateCV";
import DetailCV from "@pages/admin/CV/components/DetailCV";

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
        children: [
          { path: "dashboard", element: <Dashboard /> },
          {
            path: "users",
            element: <User />,
          },
          { path: "users/create", element: <UserForm mode="create" /> },
          { path: "users/update/:id", element: <UserForm mode="update" /> },
          { path: "users/detail/:id", element: <DetailUser /> },
          {
            path: "roles",
            element: <Role />,
          },
          {
            path: "roles-permission",
            element: <RolePermission />,
          },

          {
            path: "cvs",
            element: <CV />,
          },
          {
            path: "cvs/create",
            element: <CreateCV />,
          },
          {
            path: "cvs/detail/:_id",
            element: <DetailCV />,
          },
        ],
      },
    ],
  },
];
export default adminRoutes;
