import LayoutDefault from "../layout";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Companies from "../pages/Companies";
import About from "../pages/About";
import Blogs from "../pages/Blogs";
import Templates from "../pages/Templates";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Logout from "../pages/Logout";

// Các trang con của Jobs
import JobBySkill from "../pages/Jobs/JobBySkill";
import JobByExpertise from "../pages/Jobs/JobByExpertise";
import JobByTitle from "../pages/Jobs/JobByTitle";
import JobByCompany from "../pages/Jobs/JobByCompany";
import JobByCity from "../pages/Jobs/JobByCity";

// Các trang con của Companies
import VietnamBestITCompanies from "../pages/Companies/VietnamBestITCompanies";
import CompanyReviews from "../pages/Companies/CompanyReviews";

// Các trang con của Blogs
import SalaryReport from "../pages/Blogs/SalaryReport";
import Career from "../pages/Blogs/Career";
import ApplyingCareer from "../pages/Blogs/ApplyingCareer";
import Expertise from "../pages/Blogs/Expertise";

export const routes = [
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
