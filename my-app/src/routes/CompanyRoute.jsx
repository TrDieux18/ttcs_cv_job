import ProtectedRoute from "@components/guard/ProtectedRoute";
import CompanyLayout from "@components/layout/CompanyLayout";
import MyCompany from "@pages/company/MyCompany";
import MyJobs from "@pages/company/MyJobs";
import MyJobForm from "@pages/company/MyJobs/components/MyJobForm";
import CVManagementPage from "@pages/company/MyJobs/CVManagementPage";
import RecruitmentReportsPage from "@pages/company/MyJobs/RecruitmentReportsPage";

const companyRoutes = [
  {
    path: "/company",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <CompanyLayout />,
        children: [
          {
            path: "profile",
            element: <MyCompany />,
          },
          {
            path: "my-jobs",
            element: <MyJobs />,
          },
          {
            path: "my-jobs/create",
            element: <MyJobForm mode="create" />,
          },
          {
            path: "my-jobs/update/:id",
            element: <MyJobForm mode="update" />,
          },
          {
            path: "cvs",
            element: <CVManagementPage />,
          },
          {
            path: "reports",
            element: <RecruitmentReportsPage />,
          },
        ],
      },
    ],
  },
];

export default companyRoutes;
