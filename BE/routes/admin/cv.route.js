import express from "express";

const router = express.Router();
import { getAllCvs } from "../../controllers/admin/cv.controller.js";

router.get("/", getAllCvs);
export default router;
