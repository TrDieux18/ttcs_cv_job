import Company from "../../models/company.model.js";
import User from "../../models/user.model.js";
import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";
import { buildCompanyFilter } from "../../helpers/queryFilter.js";

export const getAllCompaniesAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const filter = buildCompanyFilter(req.query);

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ headline: regex }, { description: regex }];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [companies, total] = await Promise.all([
      Company.find(filter)
        .populate("user", "fullName email")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Company.countDocuments(filter),
    ]);

    return res.json({ success: true, data: companies, total });
  } catch (error) {
    console.error("Error fetching companies (admin):", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanyByIdAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findById(id).populate(
      "user",
      "fullName email"
    );
    if (!company)
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    return res.json({ success: true, data: company });
  } catch (error) {
    console.error("getCompanyByIdAdmin error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCompany = async (req, res) => {
  let uploadedFile = null;
  try {
    const {
      user,
      headline = "",
      description = "",
      website = "",
      location = "",
      size = "",
    } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Trường 'user' là bắt buộc" });
    }

    const userExists = await User.findById(user);
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User không tồn tại" });
    }

    const existing = await Company.findOne({ user });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "User này đã có company" });
    }

    const company = new Company({
      user,
      headline,
      description,
      website,
      location,
      size,
    });

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
    console.error("createCompany error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  let uploadedFile = null;
  try {
    const id = req.params.id;
    const { headline, description, website, location, size } = req.body;

    const company = await Company.findById(id);
    if (!company)
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });

    if (headline) company.headline = headline;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    if (size) company.size = size;

    if (req.file && req.file.buffer) {
      uploadedFile = await uploadToCloudinary(req.file.buffer, "companies");
      company.logo = {
        url: uploadedFile.secure_url,
        public_id: uploadedFile.public_id,
      };
    }

    const updated = await company.save();
    return res.json({
      success: true,
      message: "Cập nhật company thành công",
      data: updated,
    });
  } catch (error) {
    // Rollback uploaded file on error
    if (uploadedFile?.public_id) {
      try {
        const cloudinary = (await import("../../configs/cloudinary.js"))
          .default;
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      } catch (rollbackErr) {}
    }
    console.error("updateCompany error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Company.findByIdAndDelete(id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    return res.json({ success: true, message: "Xóa company thành công" });
  } catch (error) {
    console.error("deleteCompany error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
