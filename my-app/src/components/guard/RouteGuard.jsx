
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RouteGuard = ({
  requiredPermissions,
  fallbackPath = "/admin/unauthorized",
  children,
}) => {
  const permissions =
    useSelector((state) => state.user.user.role.permissions) || [];

  const hasPermission = requiredPermissions.every((perm) =>
    permissions.includes(perm)
  );

  if (!hasPermission) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

RouteGuard.propTypes = {
  requiredPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  fallbackPath: PropTypes.string,
  children: PropTypes.node,
};
export default RouteGuard;
