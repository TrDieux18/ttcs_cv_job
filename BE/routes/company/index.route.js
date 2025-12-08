import express from "express";
import companyRoute from "./company.route.js";
import jobRoute from "./job.route.js";
import applicantRoute from "./applicantion.route.js";
import applicantRoutes from "./applicant.route.js";

const router = express.Router();

router.use("/", companyRoute);
router.use("/job", jobRoute);
router.use("/applicant", applicantRoute);
router.use("/applicants", applicantRoutes);

export default router;
