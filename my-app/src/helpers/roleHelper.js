export const getRedirectPath = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();

  switch (roleTitle) {
    case "administrator":
    case "admin":
      return "/admin/dashboard";

    case "content manager":
    case "content-manager":
      return "/admin/dashboard";
    case "company":
      return "/company/my-jobs";

    case "candidate":
    default:
      return "/";
  }
};

export const isAdminRole = (roleObj) => {
  if (!roleObj) return false;
  const roleTitle = (
    typeof roleObj === "string" ? roleObj : roleObj.title
  )?.toLowerCase();
  return [
    "administrator",
    "admin",
    "content manager",
    "content-manager",
  ].includes(roleTitle);
};

export const isCompanyRole = (roleObj) => {
  if (!roleObj) return false;
  const roleTitle = (
    typeof roleObj === "string" ? roleObj : roleObj.title
  )?.toLowerCase();
  return roleTitle === "company";
};

export const isCandidateRole = (roleObj) => {
  if (!roleObj) return false;
  const roleTitle = (
    typeof roleObj === "string" ? roleObj : roleObj.title
  )?.toLowerCase();
  return roleTitle === "candidate";
};
