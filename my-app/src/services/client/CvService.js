import { BASE_API } from "@types/api";
import { ApiResponse } from "@types/response/ApiResponse";

export const createCv = async (cvData) => {
  try {
    const response = await fetch(`${BASE_API}/cv/create`, {
      method: "POST",

      body: cvData,
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Tạo người dùng thất bại!");
    }

    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Create CV failed:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const getCvById = async (cvId) => {
  console.log("Fetching CV with ID:", cvId);
  try {
    const response = await fetch(`${BASE_API}/cv/${cvId}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Lấy hồ sơ thất bại!");
    }
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Get CV by ID failed:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};
