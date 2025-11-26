import express from "express";
import cvRoute from "./cv.route.js";
import userRoute from "./user.route.js";
import jobRoute from "./job.route.js";
import blogRoute from "./blog.route.js";
import companyRoute from "./company.route.js";
import applicationRoute from "./application.route.js";
import notificationRoute from "./notification.route.js";
import savedJobRoute from "./saveJob.route.js";
import followCompanyRoute from "./followCompany.route.js";

const router = express.Router();

router.use("/cv", cvRoute);
router.use("/user", userRoute);
router.use("/jobs", jobRoute);
router.use("/blogs", blogRoute);
router.use("/companies", companyRoute);
router.use("/application", applicationRoute);
router.use("/notifications", notificationRoute);
router.use("/save-job", savedJobRoute);
router.use("/follow-company", followCompanyRoute);
export default router;
