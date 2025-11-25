import Company from "../../models/company.model.js";
import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";

export const getMyCompany = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    console.log("User ID:", userId);

    const company = await Company.findOne({ user: userId }).populate(
      "user",
      "fullName email"
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Bạn chưa có công ty",
      });
    }

    return res.json({ success: true, data: company });
  } catch (error) {
    console.error("getMyCompany error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMyCompany = async (req, res) => {
  let uploadedFile = null;
  try {
    const {
      _id,
      headline,
      description,
      website,
      location,
      size,
      companyModel,
      industry,
      country,
      workTime,
      about,
    } = req.body;

    const company = await Company.findById(_id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Bạn chưa có công ty",
      });
    }

    if (headline) company.headline = headline;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    if (size) company.size = size;
    if (companyModel) company.companyModel = companyModel;
    if (industry) company.industry = industry;
    if (country) company.country = country;
    if (workTime) company.workTime = workTime;
    if (about) company.about = about;

    if (req.file && req.file.buffer) {
      uploadedFile = await uploadToCloudinary(req.file.buffer, "companies");
      company.logo = {
        public_id: uploadedFile.secure_url,
      };
    }

    console.log("Updated company data:", uploadedFile);

    const updated = await company.save();

    return res.json({
      success: true,
      message: "Cập nhật công ty thành công",
      data: updated,
    });
  } catch (error) {
    if (uploadedFile?.public_id) {
      try {
        const cloudinary = (await import("../../configs/cloudinary.js"))
          .default;
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      } catch (rollbackErr) {}
    }
    console.error("updateMyCompany error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createMyCompany = async (req, res) => {
  let uploadedFile = null;
  try {
    const userId = res.locals.user.id;
    const {
      headline = "",
      description = "",
      website = "",
      location = "",
      size = "",
    } = req.body;

    // Kiểm tra user đã có company chưa
    const existing = await Company.findOne({ user: userId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Bạn đã có công ty rồi",
      });
    }

    const company = new Company({
      user: userId,
      headline,
      description,
      website,
      location,
      size,
    });

    // Upload logo nếu có
    if (req.file && req.file.buffer) {
      uploadedFile = await uploadToCloudinary(req.file.buffer, "companies");
      company.logo = {
        url: uploadedFile.secure_url,
        public_id: uploadedFile.public_id,
      };
    }

    const saved = await company.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    // Rollback uploaded file on error
    if (uploadedFile?.public_id) {
      try {
        const cloudinary = (await import("../../configs/cloudinary.js"))
          .default;
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      } catch (rollbackErr) {}
    }
    console.error("createMyCompany error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
