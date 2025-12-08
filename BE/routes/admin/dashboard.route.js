import express from "express";
import * as controller from "../../controllers/admin/dashboard.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, controller.getDashboardStats);
router.get("/monthly-stats", authMiddleware, controller.getMonthlyStats);
router.get(
  "/recent-activities",
  authMiddleware,
  controller.getRecentActivities
);

export default router;
