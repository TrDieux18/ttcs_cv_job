const API_DOMAIN = "http://localhost:3001/";

export const get = async (path) => {
  try {
    const res = await fetch(API_DOMAIN + path);
    const result = await res.json();
    return result;
  } catch (error) {
    alert("Lỗi kết nối: " + error.message);
  }
};

export const post = async (path, options) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    alert("Lỗi kết nối: " + error.message);
  }
};

export const del = async (path) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "DELETE",
    });
    const res = await response.json();
    return res;
  } catch (error) {
    alert("Lỗi kết nối: " + error.message);
  }
};

export const patch = async (path, options) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    alert("Lỗi kết nối: " + error.message);
  }
};
