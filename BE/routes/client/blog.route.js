import express from "express";
import {
  addComment,
  deleteComment,
  getBlogById,
  getBlogs,
  toggleLike,
} from "../../controllers/client/blog.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/:id/like", authMiddleware, toggleLike);
router.post("/:id/comments", authMiddleware, addComment);
router.delete("/:id/comments/:commentId", authMiddleware, deleteComment);
export default router;
