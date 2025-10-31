import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
  updateRolePermissions,
} from "../../controllers/admin/role.controller.js";
import { checkPermission } from "../../middlewares/admin/checkPermission.middleware.js";
import { PERMISSIONS } from "../../enums/permissons.enum.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllRoles);
router.post(
  "/create",
  authMiddleware,
  checkPermission(PERMISSIONS.ROLE_CREATE),
  createRole
);
router.patch(
  "/update/:roleId",
  authMiddleware,
  checkPermission(PERMISSIONS.ROLE_UPDATE),
  updateRole
);
router.delete(
  "/delete/:roleId",
  authMiddleware,
  checkPermission(PERMISSIONS.ROLE_DELETE),
  deleteRole
);
router.patch(
  "/permissions/update",
  authMiddleware,
  checkPermission(PERMISSIONS.ROLE_PERMISSION_UPDATE),
  updateRolePermissions
);

export default router;
