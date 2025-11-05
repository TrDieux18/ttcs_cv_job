import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

const axiosClient = axios.create({
  baseURL: ADMIN_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ✅ GET ALL JOBS (Admin)
export const getAllJobsAdmin = async (query = {}) => {
  try {
    const response = await axiosClient.get("/jobs", { params: query });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// ✅ GET JOB BY ID (Admin)
export const getJobByIdAdmin = async (jobId) => {
  try {
    const response = await axiosClient.get(`/jobs/detail/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

// ✅ CREATE JOB (Admin)
export const createJobAdmin = async (jobData) => {
  try {
    const response = await axiosClient.post("/jobs/create", jobData);
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

// ✅ UPDATE JOB (Admin)
export const updateJobAdmin = async (jobId, jobData) => {
  try {
    const response = await axiosClient.patch(`/jobs/update/${jobId}`, jobData);
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

// ✅ DELETE JOB (Admin)
export const deleteJobAdmin = async (jobId) => {
  try {
    const response = await axiosClient.delete(`/jobs/delete/${jobId}`);
    const data = response.data;
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error deleting job:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
