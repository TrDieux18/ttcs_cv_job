import { BASE_API } from "@types/api";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export const getNotifications = async (params = {}) => {
  try {
    
    const response = await axiosClient.get("/notifications", { params });
    
    return response.data;
  } catch (error) {
    console.error("[NotificationService] Error getting notifications:", error);
    console.error("[NotificationService] Error details:", error.response?.data);
    throw error;
  }
};

export const getUnreadCount = async () => {
  try {
    
    const response = await axiosClient.get("/notifications/unread-count");
   
    return response.data;
  } catch (error) {
    console.error("[NotificationService] Error getting unread count:", error);
    console.error("[NotificationService] Error details:", error.response?.data);
    throw error;
  }
};

export const markAsRead = async (id) => {
  try {
    const response = await axiosClient.patch(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error("Error marking as read:", error);
    throw error;
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await axiosClient.patch("/notifications/read-all");
    return response.data;
  } catch (error) {
    console.error("Error marking all as read:", error);
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    const response = await axiosClient.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};
