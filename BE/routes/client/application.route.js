import express from "express";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";
import { applyJob } from "../../controllers/client/application.controller.js";

const router = express.Router();
router.post("/", authMiddleware, applyJob);
export default router;
