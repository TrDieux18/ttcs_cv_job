import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

// ✅ Khởi tạo axiosClient dùng chung
const axiosClient = axios.create({
  baseURL: ADMIN_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ✅ GET ALL ROLES
export const getAllRoles = async () => {
  try {
    const response = await axiosClient.get("/roles");
    const data = response.data;
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching roles:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ CREATE ROLE
export const createRole = async (roleData) => {
  try {
    const response = await axiosClient.post("/roles/create", roleData);
    const data = response.data;
    return new ApiResponse(data.success, data.data, data.errors);
  } catch (error) {
    console.error("Error creating role:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ UPDATE ROLE
export const updateRole = async (roleId, roleData) => {
  try {
    const response = await axiosClient.patch(
      `/roles/update/${roleId}`,
      roleData
    );
    const data = response.data;
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error updating role:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ DELETE ROLE
export const deleteRole = async (roleId) => {
  try {
    const response = await axiosClient.delete(`/roles/delete/${roleId}`);
    const data = response.data;
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error deleting role:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

// ✅ UPDATE ROLE PERMISSIONS
export const updateRolePermissions = async (data) => {
  try {
    const response = await axiosClient.patch(
      "/roles/permissions/update",
      data || {}
    );
    const result = response.data;
    return new ApiResponse(result.success);
  } catch (error) {
    console.error("Error updating role permissions:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
