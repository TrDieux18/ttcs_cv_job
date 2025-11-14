import express from "express";
import {
  getMyCompany,
  updateMyCompany,
  createMyCompany,
} from "../../controllers/company/company.controller.js";
import { upload } from "../../helpers/upload.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

// Company user routes (yêu cầu đăng nhập)
router.get("/", authMiddleware, getMyCompany);
router.post("/", upload.single("logo"), authMiddleware, createMyCompany);
router.patch("/", upload.single("logo"), authMiddleware, updateMyCompany);

export default router;
