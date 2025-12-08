import axios from "axios";
import { ADMIN_API } from "@types/api";

const axiosClient = axios.create({
  baseURL: ADMIN_API,
  withCredentials: true,
});

export const reportJob = async (jobId, reportData) => {
  try {
    const response = await axiosClient.post("/reports/job", {
      jobId,
      ...reportData,
    });
    return response.data;
  } catch (error) {
    console.error("[ReportService] Error reporting job:", error);
    throw error;
  }
};
