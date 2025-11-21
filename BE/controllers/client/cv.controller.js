import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";
import CV from "../../models/cv.model.js";
import { buildCVFilter } from "../../helpers/queryFilter.js";
import { Types } from "mongoose";
import cloudinary from "../../configs/cloudinary.js";

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
    const userId = res.locals.user.id;
    console.log("Fetching CVs for User ID:", userId);

    const filter = buildCVFilter(req.query);
    filter.userId = userId;

    const cvs = await CV.find(filter)
      .populate("userId", "fullName email avatar")
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
      console.log("Uploaded file info:", uploadedFile);
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

const safeJsonParse = (str, fieldName = "unknown") => {
  if (!str) {
    console.log(`⚠️ ${fieldName}: empty or null, returning []`);
    return [];
  }
  try {
    const parsed = JSON.parse(str);
    console.log(`✅ ${fieldName} parsed successfully:`, parsed);
    return parsed;
  } catch (err) {
    console.error(`❌ ${fieldName} - Invalid JSON:`, str);
    console.error(`❌ Parse error:`, err.message);
    return [];
  }
};

export const updateCv = async (req, res) => {
  let uploadedFile = null;
  try {
    const userId = res.locals.user.id;
    const { title, skills, education, experience, projects, githubLink } =
      req.body;

    // Parse JSON fields
    const educationArr = safeJsonParse(education, "education");
    const experienceArr = safeJsonParse(experience, "experience");
    const projectsArr = safeJsonParse(projects, "projects");
    const skillsArr = safeJsonParse(skills, "skills");

    console.log("\n========== CV UPDATE START ==========");
    console.log("🔹 User ID:", userId);
    console.log("🔹 Raw request body:", req.body);
    console.log("\n📝 Parsed fields:");
    console.log("  - skills (raw):", skills);
    console.log("  - skills (parsed):", skillsArr);
    console.log("  - education (raw):", education);
    console.log("  - education (parsed):", educationArr);
    console.log("  - experience (raw):", experience);
    console.log("  - experience (parsed):", experienceArr);
    console.log("  - projects (raw):", projects);
    console.log("  - projects (parsed):", projectsArr);
    console.log("  - githubLink:", githubLink);

    // Build update data object
    const updateData = {};
    if (title) {
      updateData.title = title;
      console.log("✅ Will update title:", title);
    }
    if (skillsArr && skillsArr.length > 0) {
      updateData.skills = skillsArr;
      console.log("✅ Will update skills:", skillsArr);
    }
    if (educationArr && educationArr.length > 0) {
      updateData.education = educationArr;
      console.log("✅ Will update education:", educationArr);
    }
    if (experienceArr && experienceArr.length > 0) {
      updateData.experience = experienceArr;
      console.log("✅ Will update experience:", experienceArr);
    }
    if (projectsArr && projectsArr.length > 0) {
      updateData.projects = projectsArr;
      console.log("✅ Will update projects:", projectsArr);
    }
    if (githubLink) {
      updateData.githubLink = githubLink;
      console.log("✅ Will update githubLink:", githubLink);
    }

    console.log("\n📦 Final update data:", JSON.stringify(updateData, null, 2));

    // Handle file upload
    if (req.file) {
      uploadedFile = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "cvs"
      );
      console.log("Uploaded file info:", uploadedFile);
      updateData.fileUrl = uploadedFile.secure_url;
    }

    // Check if CV exists first
    let cv = await CV.findOne({ userId: new Types.ObjectId(userId) });

    if (!cv) {
      // Create new CV if not exists
      cv = await CV.create({
        userId: new Types.ObjectId(userId),
        title: title || "My CV",
        skills: skillsArr || [],
        education: educationArr || [],
        experience: experienceArr || [],
        projects: projectsArr || [],
        githubLink: githubLink || null,
        fileUrl: uploadedFile?.secure_url || null,
      });
      console.log("\n✅ CV CREATED successfully");
      console.log("📄 New CV:", JSON.stringify(cv, null, 2));
    } else {
      // Update existing CV
      cv = await CV.findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        { $set: updateData },
        { new: true }
      ).populate("userId", "fullName email avatar");
      console.log("\n✅ CV UPDATED successfully");
      console.log("📄 Updated CV:", JSON.stringify(cv, null, 2));
    }
    console.log("========== CV UPDATE END ==========\n");

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
    console.error(error);

    // Rollback uploaded file on error
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
