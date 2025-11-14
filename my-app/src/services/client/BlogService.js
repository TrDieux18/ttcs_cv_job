import axios from "axios";
import { BASE_API } from "@types/api";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export const getBlogs = (params) => axiosClient.get("/blogs", { params });
export const getBlogById = (id) => axiosClient.get(`/blogs/${id}`);

export const toggleLike = (id) => axiosClient.post(`/blogs/${id}/like`);


export const getComments = (blogId) =>
  axiosClient.get(`/blogs/${blogId}/comments`);

export const addComment = (blogId, content) =>
  axiosClient.post(`/blogs/${blogId}/comments`, { content });

export const deleteComment = (blogId, commentId) =>
  axiosClient.delete(`/blogs/${blogId}/comments/${commentId}`);
