import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";
import CV from "../../models/cv.model.js";

export const getCvById = async (req, res) => {
  try {
    const { cvId } = req.params;
    console.log("Fetching CV with ID:", cvId);
    const cv = await CV.findById({
      _id: cvId,
    })
      .populate("userId", "fullName email avatar")
      .lean();
    if (!cv) {
      return res.status(404).json({ success: false, message: "CV not found" });
    }
    res.status(200).json({ success: true, data: cv });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCvByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cvs = await CV.find({ userId })
      .populate("userId", "fullName email avatar")
      .lean();
    if (!cvs || cvs.length === 0) {
      return res.status(404).json({ success: false, message: "CV not found" });
    }
    res.status(200).json({ success: true, data: cvs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createCv = async (req, res) => {
  let uploadedFile = null;
  try {
    const { title, userId, skills, experience, education } = req.body;

    const parsedSkills = skills
      ? Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim())
      : [];

    const parsedExperience = experience ? JSON.parse(experience) : [];
    const parsedEducation = education ? JSON.parse(education) : [];

    let fileUrl = null;

    if (req.file) {
      const uploadedFile = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "cvs"
      );
      console.log("Uploaded file info:", uploadedFile);
      fileUrl = uploadedFile.secure_url;
    }

    const newCv = await CV.create({
      title,
      userId,
      skills: parsedSkills,
      experience: parsedExperience,
      education: parsedEducation,
      fileUrl,
    });

    if (!newCv) {
      if (uploadedFile?.public_id) {
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      }
      return res
        .status(400)
        .json({ success: false, message: "Tạo CV thất bại" });
    }

    res.status(201).json({
      success: true,
      data: newCv,
    });
  } catch (error) {
    console.error("Error creating CV:", error);

    if (uploadedFile?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedFile.public_id);
        console.log("Rollback: Deleted file from Cloudinary");
      } catch (err) {
        console.error("Failed to delete uploaded file:", err);
      }
    }

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCv = async (req, res) => {};
export const deleteCv = async (req, res) => {};
