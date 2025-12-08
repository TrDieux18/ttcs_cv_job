import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

const axiosClient = axios.create({
  baseURL: ADMIN_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const getAllCompanies = async (query = {}) => {
  try {
    const response = await axiosClient.get("/companies", { params: query });
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export const getCompanyById = async (companyId) => {
  try {
    const response = await axiosClient.get(`/companies/detail/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    throw error;
  }
};

export const createCompany = async (companyData) => {
  console.log("Company Data Service");
  for (const pair of companyData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const response = await axios.post(
      `${ADMIN_API}/companies/create`,
      companyData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Tạo công ty thất bại!");
    }

    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error creating company:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

export const updateCompany = async (companyId, companyData) => {
  try {
    const response = await axios.patch(
      `${ADMIN_API}/companies/update/${companyId}`,
      companyData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Cập nhật công ty thất bại!");
    }

    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error updating company:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const response = await axiosClient.delete(`/companies/delete/${companyId}`);
    const data = response.data;
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error deleting company:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
