import Notification from "../../models/notification.model.js";
import { Types } from "mongoose";

export const getNotifications = async (req, res) => {
  try {
    const userId = new Types.ObjectId(res.locals.user.id);
    // console.log("[getNotifications] User ID from auth:", userId);
    // console.log("[getNotifications] User ID type:", typeof userId);
    const { page = 1, limit = 20, unreadOnly = false } = req.query;

    const filter = {
      user: userId,
      deleted: false,
    };

    if (unreadOnly === "true") {
      filter.read = false;
    }

    const notifications = await Notification.find(filter)
      .populate("application", "jobTitle status")
      .populate("job", "title")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Notification.countDocuments(filter);

    res.json({
      success: true,
      data: notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get notifications",
    });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const userId = new Types.ObjectId(res.locals.user.id);

    const count = await Notification.countDocuments({
      user: userId,
      read: false,
      deleted: false,
    });

    res.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Error getting unread count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get unread count",
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = new Types.ObjectId(res.locals.user.id);

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: userId, deleted: false },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
    });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = new Types.ObjectId(res.locals.user.id);

    await Notification.updateMany(
      { user: userId, read: false, deleted: false },
      { read: true }
    );

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Error marking all as read:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark all as read",
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = new Types.ObjectId(res.locals.user.id);

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: userId },
      { deleted: true, deleteAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};
