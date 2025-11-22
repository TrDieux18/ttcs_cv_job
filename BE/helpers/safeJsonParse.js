export const safeJsonParse = (str, fieldName = "unknown") => {
  if (str === undefined || str === null || str === "") {
    return undefined;
  }
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch (err) {
    return undefined;
  }
};
