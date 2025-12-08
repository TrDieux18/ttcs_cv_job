import axios from "axios";
import { ADMIN_API } from "@types/api";

const axiosClient = axios.create({
  baseURL: ADMIN_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const getDashboardStats = async () => {
  try {
    const response = await axiosClient.get("/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export const getMonthlyStats = async (months = 6) => {
  try {
    const response = await axiosClient.get(
      `/dashboard/monthly-stats?months=${months}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    throw error;
  }
};

export const getRecentActivities = async (limit = 5) => {
  try {
    const response = await axiosClient.get(
      `/dashboard/recent-activities?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    throw error;
  }
};
