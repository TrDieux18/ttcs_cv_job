import express from "express";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";
import { updateApplicantById } from "../../controllers/company/applicantion.controller.js";

const router = express.Router();

router.patch("/update-status/:id", authMiddleware, updateApplicantById);
export default router;
