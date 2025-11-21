import express from "express";
import {
  getProfileUser,
  updateProfileUser,
} from "../../controllers/client/user.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";
import { upload } from "../../helpers/upload.js";
const router = express.Router();
router.get("/profile", authMiddleware, getProfileUser);
router.patch(
  "/update-profile",
  upload.single("avatar"),
  authMiddleware,
  updateProfileUser
);

export default router;
