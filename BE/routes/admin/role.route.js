import express from "express";
import { getAllRoles } from "../../controllers/admin/role.controller.js";

const router = express.Router();

router.get("/", getAllRoles);

export default router;
