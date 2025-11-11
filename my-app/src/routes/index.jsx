import adminRoutes from "./AdminRoute";
import clientRoutes from "./ClientRoute";
import companyRoutes from "./CompanyRoute";

export const routes = [...adminRoutes, ...clientRoutes, ...companyRoutes];
