import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  verifyToken,
} from "../../controllers/admin/auth.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/logout", logoutAdmin);

router.get("/check", verifyToken);
export default router;
