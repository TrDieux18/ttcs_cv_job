import express from "express";
import authRoute from "../common/auth.route.js";

const router = express.Router();
router.use("/", authRoute);
export default router;
