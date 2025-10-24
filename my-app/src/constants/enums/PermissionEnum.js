export const PERMISSIONS = Object.freeze({
  APPLICATION_VIEW: "application:view",
  APPLICATION_UPDATE: "application:update",
  APPLICATION_CREATE: "application:create",
  APPLICATION_DELETE: "application:delete",

  BLOG_VIEW: "blog:view",
  BLOG_UPDATE: "blog:update",
  BLOG_CREATE: "blog:create",
  BLOG_DELETE: "blog:delete",

  COMPANY_VIEW: "company:view",
  COMPANY_UPDATE: "company:update",
  COMPANY_CREATE: "company:create",
  COMPANY_DELETE: "company:delete",

  CV_VIEW: "cv:view",
  CV_UPDATE: "cv:update",
  CV_CREATE: "cv:create",
  CV_DELETE: "cv:delete",

  JOB_VIEW: "job:view",
  JOB_UPDATE: "job:update",
  JOB_CREATE: "job:create",
  JOB_DELETE: "job:delete",

  ROLE_VIEW: "role:view",
  ROLE_UPDATE: "role:update",
  ROLE_CREATE: "role:create",
  ROLE_DELETE: "role:delete",

  ROLE_PERMISSION_VIEW: "role:permission:view",
  ROLE_PERMISSION_UPDATE: "role:permission:update",

  USER_VIEW: "user:view",
  USER_UPDATE: "user:update",
  USER_CREATE: "user:create",
  USER_DELETE: "user:delete",
});

export const permissionGroup = [
  {
    title: "Người dùng",
    permissions: [
      { label: "Xem", name: PERMISSIONS.USER_VIEW },
      { label: "Tạo mới", name: PERMISSIONS.USER_CREATE },
      { label: "Chỉnh sửa", name: PERMISSIONS.USER_UPDATE },
      { label: "Xoá", name: PERMISSIONS.USER_DELETE },
    ],
  },
  {
    title: "Công ty",
    permissions: [
      { label: "Xem", name: PERMISSIONS.COMPANY_VIEW },
      { label: "Tạo mới", name: PERMISSIONS.COMPANY_CREATE },
      { label: "Chỉnh sửa", name: PERMISSIONS.COMPANY_UPDATE },
      { label: "Xoá", name: PERMISSIONS.COMPANY_DELETE },
    ],
  },
  {
    title: "Việc làm",
    permissions: [
      { label: "Xem", name: PERMISSIONS.JOB_VIEW },
      { label: "Tạo mới", name: PERMISSIONS.JOB_CREATE },
      { label: "Chỉnh sửa", name: PERMISSIONS.JOB_UPDATE },
      { label: "Xoá", name: PERMISSIONS.JOB_DELETE },
    ],
  },
  {
    title: "Vai trò",
    permissions: [
      { label: "Xem", name: PERMISSIONS.ROLE_VIEW },
      { label: "Tạo mới", name: PERMISSIONS.ROLE_CREATE },
      { label: "Chỉnh sửa", name: PERMISSIONS.ROLE_UPDATE },
      { label: "Xoá", name: PERMISSIONS.ROLE_DELETE },
      {
        label: "Phân quyền",
        name: PERMISSIONS.ROLE_PERMISSION_VIEW,
      },
    ],
  },
  {
    title: "Bài viết",
    permissions: [
      { label: "Xem", name: PERMISSIONS.BLOG_VIEW },
      { label: "Tạo mới", name: PERMISSIONS.BLOG_CREATE },
      { label: "Chỉnh sửa", name: PERMISSIONS.BLOG_UPDATE },
      { label: "Xoá", name: PERMISSIONS.BLOG_DELETE },
    ],
  },
];
