import ProtectedRoute from "@components/guard/ProtectedRoute";
import MyCompany from "@pages/company/MyCompany";
import MyJobs from "@pages/company/MyJobs";
import MyJobForm from "@pages/company/MyJobs/components/MyJobForm";

const companyRoutes = [
  {
    path: "/company",
    element: <ProtectedRoute />,
    children: [
      {
        path: "my-company",
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
    ],
  },
];

export default companyRoutes;
