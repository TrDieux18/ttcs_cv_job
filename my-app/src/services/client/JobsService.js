import axios from "axios";
import { BASE_API } from "@types/api";
import { ApiResponse } from "@types/response/ApiResponse";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export const getAllJobs = async (params = {}) => {
  try {
    const response = await axiosClient.get("/jobs", { params });

    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Lấy công việc thất bại!");
    }
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);

    const message =
      error.response?.data?.message || error.message || "Unknown error";

    return new ApiResponse(false, null, [message]);
  }
};

export const getJobFilters = () => axiosClient.get("/job/filters");
export const getJobById = (id) => axiosClient.get(`/jobs/${id}`);
