import express from "express";
import {
  changeUserStatus,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../controllers/admin/user.controller.js";
import { upload } from "../../helpers/upload.js";
import { checkPermission } from "../../middlewares/admin/checkPermission.middleware.js";
import { PERMISSIONS } from "../../enums/permissons.enum.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/detail/:id", getUserById);
router.post(
  "/create",
  upload.single("avatar"),
  checkPermission(PERMISSIONS.USER_CREATE),
  createUser
);
router.patch(
  "/update/:id",
  upload.single("avatar"),
  checkPermission(PERMISSIONS.USER_UPDATE),
  updateUser
);
router.patch(
  "/change-status/:id",
  checkPermission(PERMISSIONS.USER_UPDATE),
  changeUserStatus
);
router.delete(
  "/delete/:id",
  checkPermission(PERMISSIONS.USER_DELETE),
  deleteUser
);

export default router;
