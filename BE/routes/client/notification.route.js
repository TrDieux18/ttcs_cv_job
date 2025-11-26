import express from "express";
import * as notificationController from "../../controllers/client/notification.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, notificationController.getNotifications);
router.get(
  "/unread-count",
  authMiddleware,
  notificationController.getUnreadCount
);
router.patch("/:id/read", authMiddleware, notificationController.markAsRead);
router.patch("/read-all", authMiddleware, notificationController.markAllAsRead);
router.delete(
  "/:id",
  authMiddleware,
  notificationController.deleteNotification
);

export default router;
