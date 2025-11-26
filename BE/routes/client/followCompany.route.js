import express from "express";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";
import {
  followCompany,
  getFollowedCompaniesByUser,
  unfollowCompany,
} from "../../controllers/client/followCompany.controller.js";

const router = express.Router();
router.post("/:companyId", authMiddleware, followCompany);
router.delete("/:companyId", authMiddleware, unfollowCompany);
router.get("/", authMiddleware, getFollowedCompaniesByUser);
export default router;
