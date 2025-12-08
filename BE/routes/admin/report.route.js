import express from "express";
import { reportJob } from "../../controllers/admin/report.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/job", authMiddleware, reportJob);

export default router;
