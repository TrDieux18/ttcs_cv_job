import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

export const getAllUsers = async (query = {}) => {
  try {
    const params = new URLSearchParams(query).toString();
    const response = await fetch(`${ADMIN_API}/users?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${ADMIN_API}/users/detail/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user by ID");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  console.log("User Data Service");
  for (const pair of userData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const response = await fetch(`${ADMIN_API}/users/create`, {
      method: "POST",
      body: userData,
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Tạo người dùng thất bại!");
    }

    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error creating user:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const changeUserStatus = async (userId, status) => {
  const newStatus = !status;
  try {
    const response = await fetch(`${ADMIN_API}/users/change-status/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: newStatus }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to change user status");
    }
    const data = await response.json();
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error changing user status:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${ADMIN_API}/users/update/${userId}`, {
      method: "PATCH",
      body: userData,
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Cập nhật người dùng thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error updating user:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${ADMIN_API}/users/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    const data = await response.json();
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error deleting user:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};
