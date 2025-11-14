import express from "express";
import {
  getAllJobsAdmin,
  getJobByIdAdmin,
  createJobAdmin,
  updateJobAdmin,
  deleteJobAdmin,
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
  getJobByIdAdmin
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
  deleteJobAdmin
);

export default router;
