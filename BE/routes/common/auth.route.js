import express from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../../controllers/common/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/register", register);

router.get("/check", verifyToken);
export default router;
