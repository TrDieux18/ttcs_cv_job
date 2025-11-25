import express from "express";
import companyRoute from "./company.route.js";
import jobRoute from "./job.route.js";
import applicantRoute from "./applicantion.route.js";

const router = express.Router();

router.use("/", companyRoute);
router.use("/job", jobRoute);
router.use("/applicant", applicantRoute);

export default router;
