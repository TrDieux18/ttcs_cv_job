import { ApiResponse } from "@types/response/ApiResponse";
import { ADMIN_API } from "@types/api";

export const loginAdmin = async (value = { username: "", password: "" }) => {
  console.log("value", value);
  try {
    const response = await fetch(`${ADMIN_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
      credentials: "include",
    });

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
    const response = await fetch(`${ADMIN_API}/auth/check`, {
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

export const logoutAdmin = async () => {
  try {
    const response = await fetch(`${ADMIN_API}/auth/logout`, {
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
