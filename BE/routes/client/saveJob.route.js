import express from "express";
import {
  createSaveJob,
  deleteSavedJob,
  getCountSavedJobsByUser,
  getSavedJobByUser,
} from "../../controllers/client/saveJob.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, getSavedJobByUser);
router.post("/:jobId", authMiddleware, createSaveJob);
router.delete("/:jobId", authMiddleware, deleteSavedJob);
router.get("/count", authMiddleware, getCountSavedJobsByUser);
export default router;
