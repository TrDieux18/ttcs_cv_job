import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

export const getAllRoles = async () => {
  try {
    const response = await fetch(`${ADMIN_API}/roles`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await fetch(`${ADMIN_API}/roles/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return new ApiResponse(data.success, data.data, data.errors);
  } catch (error) {
    console.error("Error creating role:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const updateRole = async (roleId, roleData) => {
  try {
    const response = await fetch(`${ADMIN_API}/roles/update/${roleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error updating role:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const deleteRole = async (roleId) => {
  try {
    const response = await fetch(`${ADMIN_API}/roles/delete/${roleId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error deleting role:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const updateRolePermissions = async (data) => {
  try {
    const response = await fetch(`${ADMIN_API}/roles/permissions/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return new ApiResponse(result.success);
  } catch (error) {
    console.error("Error updating role permissions:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};
