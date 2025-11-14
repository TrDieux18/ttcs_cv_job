import axios from "axios";
import { BASE_API } from "@types/api";
import { ApiResponse } from "@types/response/ApiResponse";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});
export const applyJob = (data) => axiosClient.post("/application", data);
