import express from "express";

const router = express.Router();
import { getAllCvs } from "../../controllers/admin/cv.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

router.get("/", authMiddleware, getAllCvs);
export default router;
