import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

export const getAllRoles = async () => {
  try {
    const response = await fetch(`${ADMIN_API}/roles`, {
      method: "GET",
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
