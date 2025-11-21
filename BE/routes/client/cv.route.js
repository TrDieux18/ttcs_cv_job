import express from "express";
import {
  createCv,
  deleteCv,
  getCvById,
  getCvByUserId,
  updateCv,
} from "../../controllers/client/cv.controller.js";
import { upload } from "../../helpers/upload.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/user", authMiddleware, getCvByUserId);
router.get("/:cvId", authMiddleware, getCvById);
router.post("/create", authMiddleware, upload.single("file"), createCv);
router.patch("/update", authMiddleware, upload.single("file"), updateCv);
router.delete("/:id", authMiddleware, deleteCv);
export default router;
