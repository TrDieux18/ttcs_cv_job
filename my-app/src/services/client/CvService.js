import axios from "axios";
import { BASE_API } from "@types/api";
import { ApiResponse } from "@types/response/ApiResponse";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export const createCv = async (cvData) => {
  try {
    const response = await axiosClient.post(`/cv/create`, cvData);

    const data = response.data;
    return new ApiResponse(data.success, data.data, data.errors);
  } catch (error) {
    console.error("Create CV failed:", error);

    const message =
      error.response?.data?.message || error.message || "Tạo CV thất bại!";
    return new ApiResponse(false, null, [message]);
  }
};

export const getCvById = async (cvId) => {
  try {
    const response = await axiosClient.get(`/cv/${cvId}`);
    const data = response.data;

    return new ApiResponse(data.success, data.data, data.errors);
  } catch (error) {
    console.error("Get CV by ID failed:", error);

    const message =
      error.response?.data?.message || error.message || "Lấy hồ sơ thất bại!";
    return new ApiResponse(false, null, [message]);
  }
};
