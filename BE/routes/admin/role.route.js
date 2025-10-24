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

const router = express.Router();

router.get("/", getAllRoles);
router.post("/create", checkPermission(PERMISSIONS.ROLE_CREATE), createRole);
router.patch(
  "/update/:roleId",
  checkPermission(PERMISSIONS.ROLE_UPDATE),
  updateRole
);
router.delete(
  "/delete/:roleId",
  checkPermission(PERMISSIONS.ROLE_DELETE),
  deleteRole
);
router.patch(
  "/permissions/update",
  checkPermission(PERMISSIONS.ROLE_PERMISSION_UPDATE),
  updateRolePermissions
);

export default router;
