import Company from "../../models/company.model.js";
import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";

// ✅ Lấy thông tin công ty của user hiện tại
export const getMyCompany = async (req, res) => {
  try {
    const userId = req.user._id; // từ auth middleware

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

// ✅ Cập nhật thông tin công ty của user hiện tại
export const updateMyCompany = async (req, res) => {
  try {
    const userId = req.user._id;
    const { headline, description, website, location, size } = req.body;

    const company = await Company.findOne({ user: userId });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Bạn chưa có công ty",
      });
    }

    // Cập nhật các field
    if (headline) company.headline = headline;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    if (size) company.size = size;

    // Upload logo mới nếu có
    if (req.file && req.file.buffer) {
      const result = await uploadToCloudinary(req.file.buffer, "companies");
      company.logo = { url: result.secure_url, public_id: result.public_id };
    }

    const updated = await company.save();
    return res.json({
      success: true,
      message: "Cập nhật công ty thành công",
      data: updated,
    });
  } catch (error) {
    console.error("updateMyCompany error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Tạo công ty cho user hiện tại (nếu chưa có)
export const createMyCompany = async (req, res) => {
  try {
    const userId = req.user._id;
    const { headline = "", description = "", website = "", location = "", size = "" } = req.body;

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
      const result = await uploadToCloudinary(req.file.buffer, "companies");
      company.logo = { url: result.secure_url, public_id: result.public_id };
    }

    const saved = await company.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error("createMyCompany error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
