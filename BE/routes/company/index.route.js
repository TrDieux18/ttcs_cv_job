import express from "express";
import companyRoute from "./company.route.js";
import jobRoute from "./job.route.js";

const router = express.Router();

router.use("/my-company", companyRoute);
router.use("/my-jobs", jobRoute);

export default router;
