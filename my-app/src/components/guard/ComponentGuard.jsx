
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const ComponentGuard = ({
  requiredPermissions,
  fallbackComponent = null,
  children,
}) => {
  const permissions =
    useSelector((state) => state.user.user.role.permissions) || [];

  const hasPermission = requiredPermissions.every((p) =>
    permissions.includes(p)
  );

  return hasPermission ? <>{children}</> : <>{fallbackComponent}</>;
};

ComponentGuard.propTypes = {
  requiredPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  fallbackComponent: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default ComponentGuard;
