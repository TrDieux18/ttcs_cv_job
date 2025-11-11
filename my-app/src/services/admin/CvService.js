import axios from "axios";
import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

export const getAllCvs = async () => {
  try {
    const response = await axios.get(`${ADMIN_API}/cvs`, {
      withCredentials: true,
    });

    const data = response.data;
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error fetching cvs:", error);

    const message =
      error.response?.data?.message || error.message || "Unknown error";

    return new ApiResponse(false, null, [message]);
  }
};
