import { formatName } from "./formatName.js";

export const cleanValue = (v) => {
  if (v === undefined) return undefined;
  if (v === null) return null;
  if (v === "null") return null;
  if (v === "") return null;
  return v;
};

export const buildUpdateData = (body, arrayFields = []) => {
  const fields = [
    "fullName",
    "gender",
    "address",
    "phoneNumber",
    "jobTitle",
    "dateOfBirth",
    "socialLinks",
  ];

  let updateData = {};

  fields.forEach((key) => {
    let cleaned = cleanValue(body[key]);
    if (cleaned !== undefined) {
      updateData[key] =
        key === "fullName" && cleaned ? formatName(cleaned) : cleaned;
    }
  });

  // Handle foreignLanguages specifically
  if (body.foreignLanguages) {
    try {
      updateData.foreignLanguages = JSON.parse(body.foreignLanguages);
    } catch (err) {
      console.error(
        "Invalid JSON for foreignLanguages:",
        body.foreignLanguages
      );
    }
  }

  arrayFields.forEach((key) => {
    if (Array.isArray(body[key])) {
      updateData[key] = body[key];
    } else if (body[key] === "null") {
      updateData[key] = null;
    }
  });

  return updateData;
};
