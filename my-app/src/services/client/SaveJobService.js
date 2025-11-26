import { BASE_API } from "@types/api";
import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export const getSavedJobsByUser = async () => {
  try {
    const response = await axiosClient.get("/save-job");
    const data = response.data;
    if (!data.success) {
      throw new Error(
        data.message || "Lấy danh sách công việc đã lưu thất bại!"
      );
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const createSaveJob = async (jobId) => {
  try {
    const response = await axiosClient.post(`/save-job/${jobId}`);
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Lưu công việc thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error creating save job:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const deleteSaveJob = async (saveJobId) => {
  try {
    const response = await axiosClient.delete(`/save-job/${saveJobId}`);
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Xóa công việc đã lưu thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error deleting save job:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const getCountSavedJobsByUser = async () => {
  try {
    const response = await axiosClient.get("/save-job/count");
    const data = response.data;
    if (!data.success) {
      throw new Error(
        data.message || "Lấy số lượng công việc đã lưu thất bại!"
      );
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching saved job count:", error);
    throw error;
  }
};
