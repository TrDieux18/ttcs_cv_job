import { BASE_API } from "@types/api";
import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export const getFollowedCompaniesByUser = async () => {
  try {
    const response = await axiosClient.get("/follow-company");
    const data = response.data;
    if (!data.success) {
      throw new Error(
        data.message || "Lấy danh sách công ty theo dõi thất bại!"
      );
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching followed companies:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const followCompany = async (companyId) => {
  try {
    const response = await axiosClient.post(`/follow-company/${companyId}`);
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Theo dõi công ty thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error following company:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const unfollowCompany = async (followCompanyId) => {
  console.log("Unfollowing company with ID:", followCompanyId);
  try {
    const response = await axiosClient.delete(
      `/follow-company/${followCompanyId}/deleted`
    );
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Hủy theo dõi công ty thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error unfollowing company:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};
