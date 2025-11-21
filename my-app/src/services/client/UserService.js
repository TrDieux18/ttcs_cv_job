import { BASE_API } from "@types/api";
import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export const getUserProfile = async () => {
  try {
    const response = await axiosClient.get("/user/profile");
    const data = response.data;
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

export const updateUserProfile = async (profileData) => {
  for (const pair of profileData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  try {
    const response = await axiosClient.patch(
      "/user/update-profile",
      profileData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Cập nhật hồ sơ thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error updating user profile:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
