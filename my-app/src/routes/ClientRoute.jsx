import LayoutDefault from "../components/layout";
import Home from "../pages/client/Home";
import Jobs from "../pages/client/Jobs";
import Companies from "../pages/client/Companies";
import About from "../pages/client/About";
import Blogs from "../pages/client/Blogs";
import Templates from "../pages/client/Templates";

import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/client/Login";
import Logout from "../pages/common/Logout";

// Các trang con của Jobs
import JobBySkill from "../pages/client/Jobs/JobBySkill";
import JobByExpertise from "../pages/client/Jobs/JobByExpertise";
import JobByTitle from "../pages/client/Jobs/JobByTitle";
import JobByCompany from "../pages/client/Jobs/JobByCompany";
import JobByCity from "../pages/client/Jobs/JobByCity";

// Các trang con của Companies
import VietnamBestITCompanies from "../pages/client/Companies/VietnamBestITCompanies";
import CompanyReviews from "../pages/client/Companies/CompanyReviews";

// Các trang con của Blogs
import SalaryReport from "../pages/client/Blogs/SalaryReport";
import Career from "../pages/client/Blogs/Career";
import ApplyingCareer from "../pages/client/Blogs/ApplyingCareer";
import Expertise from "../pages/client/Blogs/Expertise";

const clientRoutes = [
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
        element: <Jobs />,
        children: [
          { path: "skill", element: <JobBySkill /> },
          { path: "expertise", element: <JobByExpertise /> },
          { path: "title", element: <JobByTitle /> },
          { path: "company", element: <JobByCompany /> },
          { path: "city", element: <JobByCity /> },
        ],
      },
      {
        path: "companies",
        element: <Companies />,
        children: [
          {
            path: "vietnam-best-it-companies",
            element: <VietnamBestITCompanies />,
          },
          { path: "review", element: <CompanyReviews /> },
        ],
      },
      {
        path: "blogs",
        element: <Blogs />,
        children: [
          { path: "salary-report", element: <SalaryReport /> },
          { path: "career", element: <Career /> },
          { path: "apply", element: <ApplyingCareer /> },
          { path: "expertise", element: <Expertise /> },
        ],
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
