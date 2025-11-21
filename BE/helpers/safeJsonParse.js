export const safeJsonParse = (str, fieldName = "unknown") => {
  if (!str) {
    return [];
  }
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch (err) {
    return [];
  }
};
