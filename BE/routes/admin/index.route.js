import express from "express";

import userRoute from "./user.route.js";
import roleRoute from "./role.route.js";
import cvRoute from "./cv.route.js";
import companyRoute from "./company.route.js";
import jobRoute from "./job.route.js";
import dashboardRoute from "./dashboard.route.js";
import reportRoute from "./report.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/roles", roleRoute);
router.use("/cvs", cvRoute);
router.use("/companies", companyRoute);
router.use("/jobs", jobRoute);
router.use("/dashboard", dashboardRoute);
router.use("/reports", reportRoute);

export default router;
