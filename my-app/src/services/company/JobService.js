import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";

const BASE_URL = "http://localhost:3002/company/my-jobs";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ✅ GET MY JOBS (Company user)
export const getMyJobs = async (query = {}) => {
  try {
    const response = await axiosClient.get("/", { params: query });
    return response.data;
  } catch (error) {
    console.error("Error fetching my jobs:", error);
    throw error;
  }
};

// ✅ GET MY JOB BY ID
export const getMyJobById = async (jobId) => {
  try {
    const response = await axiosClient.get(`/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching my job:", error);
    throw error;
  }
};

// ✅ CREATE JOB
export const createMyJob = async (jobData) => {
  try {
    const response = await axiosClient.post("/", jobData);
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Tạo job thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error creating job:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ UPDATE JOB
export const updateMyJob = async (jobId, jobData) => {
  try {
    const response = await axiosClient.patch(`/${jobId}`, jobData);
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Cập nhật job thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error updating job:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ DELETE JOB
export const deleteMyJob = async (jobId) => {
  try {
    const response = await axiosClient.delete(`/${jobId}`);
    const data = response.data;
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error deleting job:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
