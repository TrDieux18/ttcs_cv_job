import streamifier from "streamifier";
import cloudinary from "../../configs/cloudinary.js";

export const uploadToCloudinary = (
  fileBuffer,
  mimetype,
  folder = "uploads"
) => {
  return new Promise((resolve, reject) => {
    // Xác định loại resource
    let resourceType = "image"; // mặc định là ảnh
    if (
      mimetype === "application/pdf" ||
      mimetype === "application/msword" ||
      mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimetype === "application/zip"
    ) {
      resourceType = "raw"; // PDF, DOC, DOCX, ZIP
    } else if (mimetype.startsWith("video/")) {
      resourceType = "video"; // nếu sau này bạn có video
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
