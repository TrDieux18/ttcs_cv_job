import express from "express";
import {
  login,
  logout,
  verifyToken,
} from "../../controllers/common/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", verifyToken);
export default router;
