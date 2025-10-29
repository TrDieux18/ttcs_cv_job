import express from "express";

import userRoute from "./user.route.js";
import roleRoute from "./role.route.js";
import cvRoute from "./cv.route.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.use("/users", authMiddleware, userRoute);
router.use("/roles", authMiddleware, roleRoute);
router.use("/cvs", authMiddleware, cvRoute);

export default router;
