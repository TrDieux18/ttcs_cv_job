import express from "express";

const router = express.Router();
import { getAllCVs } from "../../controllers/admin/cv.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

router.get("/", authMiddleware, getAllCVs);
export default router;
