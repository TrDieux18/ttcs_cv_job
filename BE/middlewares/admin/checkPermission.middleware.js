export const checkPermission = (permission) => {
  return (req, res, next) => {
    const admin = res.locals.user;

    if (!admin || !admin.role || !admin.role.permissions) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user or permissions",
      });
    }

    if (!admin.role.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Missing permission '${permission}'`,
      });
    }

    next();
  };
};
