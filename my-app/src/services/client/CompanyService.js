import axios from "axios";
import { BASE_API } from "@types/api";
import { ApiResponse } from "@types/response/ApiResponse";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export const getAllCompanies = async () => {
  try {
    const response = await axiosClient.get(`/companies`);
    const data = response.data;
    return new ApiResponse(data.success, data.data, data.errors);
  } catch (error) {
    console.error("Get all companies failed:", error);
    const message = error.response?.data?.message || "Unknown error";
    return new ApiResponse(false, null, [message]);
  }
};
