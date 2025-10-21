import express from "express";
import authRoute from "../common/auth.route.js";
import userRoute from "./user.route.js";
import roleRoute from "./role.route.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();
router.use("/auth", authMiddleware, authRoute);
router.use("/users", authMiddleware, userRoute);
router.use("/roles", authMiddleware, roleRoute);
export default router;
