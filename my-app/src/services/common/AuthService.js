import { ApiResponse } from "@types/response/ApiResponse";
import { AUTH_API } from "@types/api";

export const login = async (value = { username: "", password: "" }) => {
  console.log("value", value);
  try {
    const response = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
      credentials: "include",
    });

    console.log("response", response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    console.error("Error logging in:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const verifyToken = async () => {
  try {
    const response = await fetch(`${AUTH_API}/check`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error verifying token:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${AUTH_API}/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return new ApiResponse(data.success);
  } catch (error) {
    console.error("Error logging out:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};

export const register = async (value) => {
  try {
    const response = await fetch(`${AUTH_API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });

    const data = await response.json();
    return new ApiResponse(
      data.success || false,
      data.data || null,
      data.message ? [data.message] : []
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new ApiResponse(false, null, [error.message]);
  }
};
