import express from "express";
import {
  getMyJobs,
  getMyJobById,
  createMyJob,
  updateMyJob,
  deleteMyJob,
} from "../../controllers/company/job.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

// Company user routes for managing their own jobs
router.get("/", authMiddleware, getMyJobs);
router.get("/:id", authMiddleware, getMyJobById);
router.post("/", authMiddleware, createMyJob);
router.patch("/:id", authMiddleware, updateMyJob);
router.delete("/:id", authMiddleware, deleteMyJob);

export default router;
