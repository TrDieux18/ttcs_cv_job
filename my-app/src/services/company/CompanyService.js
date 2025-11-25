import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";

const BASE_URL = "http://localhost:3002/company";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const getMyCompany = async () => {
  try {
    const response = await axiosClient.get("/");
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Lấy thông tin công ty thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching my company:", error);
    throw error;
  }
};

export const createMyCompany = async (companyData) => {
  try {
    const response = await axios.post(`${BASE_URL}/my-company`, companyData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Tạo công ty thất bại!");
    }

    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error creating my company:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

export const updateMyCompany = async (companyData) => {
  try {
    const response = await axios.patch(`${BASE_URL}`, companyData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Cập nhật công ty thất bại!");
    }

    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error updating my company:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
