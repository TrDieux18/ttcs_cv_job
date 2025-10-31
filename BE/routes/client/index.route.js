import express from "express";
import cvRoute from "./cv.route.js";
import userRoute from "./user.route.js";
import jobRoute from "./job.route.js";
import blogRoute from "./blog.route.js";
import companyRoute from "./company.route.js";

const router = express.Router();

router.use("/cv", cvRoute);
router.use("/user", userRoute);
router.use("/jobs", jobRoute);
router.use("/blogs", blogRoute);
router.use("/companies", companyRoute);
export default router;
