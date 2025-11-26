import LayoutDefault from "@components/layout";
import Home from "@pages/client/Home";

import Companies from "@pages/client/Companies";
import About from "@pages/client/About";
import Blogs from "@pages/client/Blogs";
import Templates from "@pages/client/Templates";

import PrivateRoute from "@components/PrivateRoute";
import Login from "@pages/client/Login";
import Logout from "@pages/common/Logout";

import Register from "@pages/client/Register";
import BlogDetail from "@pages/client/Blogs/BlogDetail";
import JobList from "@pages/client/Jobs";
import DetailCompany from "@pages/client/Companies/components/DetailCompany";
import DetailJob from "@pages/client/Jobs/components/DetailJob";
import CV from "../pages/client/CV";

import AccountLayout from "../pages/client/Dashboard";
import Dashboard from "../pages/client/Dashboard/components/Dashboard";
import Profile from "../pages/client/Templates/Profile";
import MyJobs from "../pages/client/Dashboard/components/MyJobs";
import Notification from "../pages/client/Dashboard/components/Notificantion";
import Setting from "../pages/client/Dashboard/components/Setting";

const clientRoutes = [
  {
    path: "/cv",
    element: <CV />,
  },
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "jobs",
        element: <JobList />,
      },
      {
        path: "jobs/:id",
        element: <DetailJob />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "companies/:slug",
        element: <DetailCompany />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "templates",
        element: <Templates />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <AccountLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },

          {
            path: "my-jobs",
            element: <MyJobs />,
          },
          {
            path: "notifications",
            element: <Notification />,
          },
          {
            path: "setting",
            element: <Setting />,
          },
        ],
      },

      {
        element: <PrivateRoute />,
        children: [
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
];

export default clientRoutes;
