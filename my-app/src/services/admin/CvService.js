import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

export const getAllCvs = async () => {
  try {
    const response = await fetch(`${ADMIN_API}/cvs`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching cvs:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};
