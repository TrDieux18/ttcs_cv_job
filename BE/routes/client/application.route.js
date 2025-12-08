import express from "express";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";
import {
  applyJob,
  getCountOfApplicantsByUserId,
  getMyApplications,
  cancelApplication,
} from "../../controllers/client/application.controller.js";

const router = express.Router();
router.post("/", authMiddleware, applyJob);
router.get("/my-applications", authMiddleware, getMyApplications);
router.get("/count", authMiddleware, getCountOfApplicantsByUserId);
router.delete("/:id", authMiddleware, cancelApplication);
export default router;
