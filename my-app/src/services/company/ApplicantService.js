import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";

const BASE_URL = "http://localhost:3002/company/applicant";
const NEW_BASE_URL = "http://localhost:3002/company/applicants";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const newAxiosClient = axios.create({
  baseURL: NEW_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const getAllApplicants = async (params = {}) => {
  try {
    const response = await newAxiosClient.get("/", { params });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Không thể lấy danh sách ứng viên!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error getting all applicants:", error);
    return new ApiResponse(false, null, error.message);
  }
};

export const getApplicantStats = async () => {
  try {
    const response = await newAxiosClient.get("/stats");
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Không thể lấy thống kê!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error getting applicant stats:", error);
    return new ApiResponse(false, null, error.message);
  }
};

export const getRecruitmentReport = async (params = {}) => {
  try {
    const response = await newAxiosClient.get("/report", { params });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Không thể lấy báo cáo!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error getting recruitment report:", error);
    return new ApiResponse(false, null, error.message);
  }
};

export const updateStatusApplicant = async (applicantId, status) => {
  try {
    const response = await axiosClient.patch(`/update-status/${applicantId}`, {
      status,
    });
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Cập nhật trạng thái ứng viên thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error updating applicant status:", error);
    return new ApiResponse(false, null, error.message);
  }
};
