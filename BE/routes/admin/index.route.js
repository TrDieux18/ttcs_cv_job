import express from "express";

import userRoute from "./user.route.js";
import roleRoute from "./role.route.js";
import cvRoute from "./cv.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/roles", roleRoute);
router.use("/cvs", cvRoute);

export default router;
