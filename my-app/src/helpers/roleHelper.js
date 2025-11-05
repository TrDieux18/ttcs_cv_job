// Helper để xác định route redirect dựa trên role của user
export const getRedirectPath = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();
  
  switch (roleTitle) {
    case "administrator":
    case "admin":
      return "/admin/dashboard";
    
    case "content manager":
    case "content-manager":
      return "/admin/dashboard"; // Content Manager cũng vào admin
    
    case "company":
      return "/company/my-jobs"; // Company user vào quản lý jobs
    
    case "candidate":
    default:
      return "/"; // Candidate về trang chủ client
  }
};

// Helper kiểm tra user có phải admin không (bao gồm administrator và content manager)
export const isAdminRole = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();
  return roleTitle === "administrator" || 
         roleTitle === "admin" || 
         roleTitle === "content manager" ||
         roleTitle === "content-manager";
};

// Helper kiểm tra user có phải company không
export const isCompanyRole = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();
  return roleTitle === "company";
};

// Helper kiểm tra user có phải candidate không
export const isCandidateRole = (userRole) => {
  const roleTitle = userRole?.title?.toLowerCase();
  return roleTitle === "candidate";
};
