import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";
import CV from "../../models/cv.model.js";
import { buildCVFilter } from "../../helpers/queryFilter.js";
import { Types } from "mongoose";
import cloudinary from "../../configs/cloudinary.js";
import { safeJsonParse } from "../../helpers/safeJsonParse.js";
import ollamaService from "../../services/ollama.service.js";

export const getCvById = async (req, res) => {
  try {
    const { cvId } = req.params;
    const cv = await CV.findById({
      _id: cvId,
    })
      .populate(
        "userId",
        "fullName email avatar phoneNumber dateOfBirth address gender jobTitle introduction foreignLanguages socialLinks"
      )
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
    const userId = res.locals.user.id;

    const filter = buildCVFilter(req.query);
    filter.userId = userId;

    const cvs = await CV.find(filter)
      .populate(
        "userId",
        "fullName email avatar phoneNumber dateOfBirth address gender jobTitle introduction foreignLanguages socialLinks"
      )
      .lean();

    if (!cvs || cvs.length === 0) {
      return res.status(404).json({ success: false, message: "CV not found" });
    }

    res.status(200).json({
      success: true,
      data: cvs,
    });
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
      fileUrl = uploadedFile.secure_url;
    }

    const newCv = await CV.create({
      title,
      userId: new Types.ObjectId(userId),
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
    if (uploadedFile?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      } catch (err) {}
    }

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCv = async (req, res) => {
  let uploadedFile = null;
  try {
    const userId = res.locals.user.id;
    const {
      title,
      skills,
      education,
      experience,
      projects,
      certificates,
      awards,
      githubLink,
    } = req.body;

    const educationArr = safeJsonParse(education, "education");
    const experienceArr = safeJsonParse(experience, "experience");
    const projectsArr = safeJsonParse(projects, "projects");
    const skillsArr = safeJsonParse(skills, "skills");
    const certificatesArr = safeJsonParse(certificates, "certificates");
    const awardsArr = safeJsonParse(awards, "awards");

    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (
      skillsArr !== null &&
      skillsArr !== undefined &&
      Array.isArray(skillsArr)
    ) {
      updateData.skills = skillsArr;
    }
    if (
      educationArr !== null &&
      educationArr !== undefined &&
      Array.isArray(educationArr)
    ) {
      updateData.education = educationArr;
    }
    if (
      experienceArr !== null &&
      experienceArr !== undefined &&
      Array.isArray(experienceArr)
    ) {
      updateData.experience = experienceArr;
    }
    if (
      projectsArr !== null &&
      projectsArr !== undefined &&
      Array.isArray(projectsArr)
    ) {
      updateData.projects = projectsArr;
    }
    if (
      certificatesArr !== null &&
      certificatesArr !== undefined &&
      Array.isArray(certificatesArr)
    ) {
      updateData.certificates = certificatesArr;
    }
    if (
      awardsArr !== null &&
      awardsArr !== undefined &&
      Array.isArray(awardsArr)
    ) {
      updateData.awards = awardsArr;
    }
    if (githubLink) {
      updateData.githubLink = githubLink;
    }


    if (req.body.fileUrl !== undefined) {
      updateData.fileUrl = req.body.fileUrl || null;
    }

    if (req.file) {
      uploadedFile = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "cvs"
      );
      updateData.fileUrl = uploadedFile.secure_url;
    }

    let cv = await CV.findOne({ userId: new Types.ObjectId(userId) });

    if (!cv) {
      cv = await CV.create({
        userId: new Types.ObjectId(userId),
        title: title || "My CV",
        skills: skillsArr || [],
        education: educationArr || [],
        experience: experienceArr || [],
        projects: projectsArr || [],
        certificates: certificatesArr || [],
        awards: awardsArr || [],
        githubLink: githubLink || null,
        fileUrl: uploadedFile?.secure_url || null,
      });
    } else {
      cv = await CV.findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        { $set: updateData },
        { new: true }
      ).populate("userId", "fullName email avatar");
    }

    if (!cv) {
      if (uploadedFile?.public_id) {
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      }
      return res
        .status(404)
        .json({ success: false, message: "CV update failed" });
    }

    res.status(200).json({ success: true, data: cv });
  } catch (error) {
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

export const deleteCv = async (req, res) => {};

export const scoreCv = async (req, res) => {
  try {
    const { cvId } = req.params;
    const userId = res.locals.user.id;

    // Tìm CV và populate thông tin user
    const cv = await CV.findById(cvId).populate(
      "userId",
      "fullName email avatar phoneNumber dateOfBirth address gender jobTitle introduction foreignLanguages socialLinks"
    );

    if (!cv) {
      return res.status(404).json({ 
        success: false, 
        message: "Không tìm thấy CV" 
      });
    }

    // Kiểm tra quyền sở hữu CV
    if (cv.userId._id.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: "Bạn không có quyền chấm điểm CV này" 
      });
    }

    // Gọi AI service để chấm điểm
    const scoreData = await ollamaService.scoreCV(cv, cv.userId);

    // Cập nhật điểm vào CV
    cv.aiScore = scoreData;
    await cv.save();

    res.status(200).json({
      success: true,
      message: "Chấm điểm CV thành công",
      data: {
        cvId: cv._id,
        aiScore: scoreData,
      },
    });
  } catch (error) {
    console.error("Score CV Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Lỗi khi chấm điểm CV",
    });
  }
};
