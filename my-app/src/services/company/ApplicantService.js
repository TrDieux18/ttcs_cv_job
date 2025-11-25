import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";

const BASE_URL = "http://localhost:3002/company/applicant";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

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
