import express from "express";
import * as controller from "../../controllers/company/applicant.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, controller.getAllApplicants);
router.get("/stats", authMiddleware, controller.getApplicantStats);
router.get("/report", authMiddleware, controller.getRecruitmentReport);

export default router;
