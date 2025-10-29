import { BASE_API } from "@types/api";

export const login = async (user) => {
  try {
    const res = await fetch(
      `${BASE_API}/users?email=${encodeURIComponent(
        user.email
      )}&password=${encodeURIComponent(user.password)}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
