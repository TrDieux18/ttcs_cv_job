import express from "express";
import { getAllJobs } from "../../controllers/client/job.controller.js";
const router = express.Router();
router.get("/", getAllJobs);
export default router;
