import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

// ✅ axiosClient dùng chung
const axiosClient = axios.create({
  baseURL: ADMIN_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ✅ GET ALL USERS (có query params)
export const getAllUsers = async (query = {}) => {
  try {
    const response = await axiosClient.get("/users", { params: query });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// ✅ GET USER BY ID
export const getUserById = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/detail/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// ✅ CREATE USER (FormData)
export const createUser = async (userData) => {
  console.log("User Data Service");
  for (const pair of userData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const response = await axios.post(`${ADMIN_API}/users/create`, userData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Tạo người dùng thất bại!");
    }

    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error creating user:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ CHANGE USER STATUS
export const changeUserStatus = async (userId, status) => {
  const newStatus = !status;
  try {
    const response = await axiosClient.patch(`/users/change-status/${userId}`, {
      isActive: newStatus,
    });

    const data = response.data;
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error changing user status:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ UPDATE USER (FormData)
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.patch(
      `${ADMIN_API}/users/update/${userId}`,
      userData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const data = response.data;
    if (!data.success) {
      throw new Error(data.message || "Cập nhật người dùng thất bại!");
    }

    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error updating user:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ DELETE USER
export const deleteUser = async (userId) => {
  try {
    const response = await axiosClient.delete(`/users/delete/${userId}`);
    const data = response.data;
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error deleting user:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
