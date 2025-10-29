import express from "express";
import { getProfileUser } from "../../controllers/client/user.controller.js";
const router = express.Router();
router.get("/profile", getProfileUser);

export default router;
