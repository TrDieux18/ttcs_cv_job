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

export const getCvByUserId = async () => {
  try {
    const response = await axiosClient.get(`/cv/user`);
    const data = response.data;
    return new ApiResponse(data.success, data.data, data.errors);
  } catch (error) {
    console.error("Get CV by User ID failed:", error);
    const message =
      error.response?.data?.message || error.message || "Lấy hồ sơ thất bại!";
    return new ApiResponse(false, null, [message]);
  }
};

export const updateCv = async (cvData) => {
  for (const pair of cvData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  try {
    const response = await axiosClient.patch(`/cv/update`, cvData);
    const data = response.data;
    return new ApiResponse(data.success, data.data, data.errors);
  } catch (error) {
    console.error("Update CV failed:", error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Cập nhật hồ sơ thất bại!";
    return new ApiResponse(false, null, [message]);
  }
};

export const scoreCv = async (cvId) => {
  try {
    const response = await axiosClient.post(`/cv/score/${cvId}`);
    const data = response.data;
    return new ApiResponse(data.success, data.data, data.errors);
  } catch (error) {
    console.error("Score CV failed:", error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Chấm điểm CV thất bại!";
    return new ApiResponse(false, null, [message]);
  }
};