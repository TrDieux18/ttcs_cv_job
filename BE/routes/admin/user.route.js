import express from "express";
import {
  changeUserStatus,
  createUser,
  getAllUsers,
  getUserById,
} from "../../controllers/admin/user.controller.js";
import { upload } from "../../helpers/upload.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/detail/:id", getUserById);
router.post("/create", upload.single("avatar"), createUser);
router.patch("/change-status/:id", changeUserStatus);

export default router;
