import express from "express";
import {
  getAllCompaniesAdmin,
  getCompanyByIdAdmin,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../controllers/admin/company.controller.js";
import { upload } from "../../helpers/upload.js";
import { checkPermission } from "../../middlewares/admin/checkPermission.middleware.js";
import { PERMISSIONS } from "../../enums/permissons.enum.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, checkPermission(PERMISSIONS.COMPANY_VIEW), getAllCompaniesAdmin);
router.get("/detail/:id", authMiddleware, checkPermission(PERMISSIONS.COMPANY_VIEW), getCompanyByIdAdmin);
router.post(
  "/create",
  upload.single("logo"),
  authMiddleware,
  checkPermission(PERMISSIONS.COMPANY_CREATE),
  createCompany
);
router.patch(
  "/update/:id",
  upload.single("logo"),
  authMiddleware,
  checkPermission(PERMISSIONS.COMPANY_UPDATE),
  updateCompany
);
router.delete(
  "/delete/:id",
  authMiddleware,
  checkPermission(PERMISSIONS.COMPANY_DELETE),
  deleteCompany
);

export default router;
