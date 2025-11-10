export const getRedirectPath = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();

  switch (roleTitle) {
    case "administrator":
    case "admin":
      return "/admin/auth/login";

    case "content manager":
    case "content-manager":
      return "/admin/auth/login";

    case "company":
      return "/company/my-jobs";

    case "candidate":
    default:
      return "/";
  }
};

export const isAdminRole = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();
  return [
    "administrator",
    "admin",
    "content manager",
    "content-manager",
  ].includes(roleTitle);
};

export const isCompanyRole = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();
  return roleTitle === "company";
};

export const isCandidateRole = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();
  return roleTitle === "candidate";
};
