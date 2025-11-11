import express from "express";
import {
  getAllCompanies,
  getCompanyBySlug,
} from "../../controllers/client/company.controller.js";

const router = express.Router();

router.get("/", getAllCompanies);
router.get("/:slug", getCompanyBySlug);

export default router;
