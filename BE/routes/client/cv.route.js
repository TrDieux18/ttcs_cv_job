import express from "express";
import {
  createCv,
  deleteCv,
  getCvById,
  getCvByUserId,
  updateCv,
} from "../../controllers/client/cv.controller.js";
import { upload } from "../../helpers/upload.js";

const router = express.Router();

router.get("/detail/:userId", getCvByUserId);
router.get("/:cvId", getCvById);
router.post("/create", upload.single("fileUrl"), createCv);
router.patch("/:id", updateCv);
router.delete("/:id", deleteCv);
export default router;
