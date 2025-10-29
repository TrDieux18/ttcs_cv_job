import express from "express";
import cvRoute from "./cv.route.js";
import userRoute from "./user.route.js";
const router = express.Router();

router.use("/cv", cvRoute);
router.use("/user", userRoute);
export default router;
