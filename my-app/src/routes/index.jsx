import adminRoutes from "./AdminRoute";
import clientRoutes from "./ClientRoute";

export const routes = [...adminRoutes, ...clientRoutes];
