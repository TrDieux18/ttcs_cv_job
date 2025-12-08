import express from "express";
import {
  getAllJobsAdmin,
  getJobById,
  createJobAdmin,
  updateJobAdmin,
  deleteJob,
} from "../../controllers/admin/job.controller.js";
import { checkPermission } from "../../middlewares/admin/checkPermission.middleware.js";
import { PERMISSIONS } from "../../enums/permissons.enum.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  checkPermission(PERMISSIONS.JOB_VIEW),
  getAllJobsAdmin
);
router.get(
  "/detail/:id",
  authMiddleware,
  checkPermission(PERMISSIONS.JOB_VIEW),
  getJobById
);
router.post(
  "/create",
  authMiddleware,
  checkPermission(PERMISSIONS.JOB_CREATE),
  createJobAdmin
);
router.patch(
  "/update/:id",
  authMiddleware,
  checkPermission(PERMISSIONS.JOB_UPDATE),
  updateJobAdmin
);
router.delete(
  "/delete/:id",
  authMiddleware,
  checkPermission(PERMISSIONS.JOB_DELETE),
  deleteJob
);

export default router;
