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
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/detail/:id", authMiddleware, getUserById);
router.post(
  "/create",
  upload.single("avatar"),
  authMiddleware,
  checkPermission(PERMISSIONS.USER_CREATE),
  createUser
);
router.patch(
  "/update/:id",
  upload.single("avatar"),
  authMiddleware,
  checkPermission(PERMISSIONS.USER_UPDATE),
  updateUser
);
router.patch(
  "/change-status/:id",
  authMiddleware,
  checkPermission(PERMISSIONS.USER_UPDATE),
  changeUserStatus
);
router.delete(
  "/delete/:id",
  authMiddleware,
  checkPermission(PERMISSIONS.USER_DELETE),
  deleteUser
);

export default router;
