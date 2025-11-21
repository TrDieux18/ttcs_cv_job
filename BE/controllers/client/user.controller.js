import { Types } from "mongoose";
import User from "../../models/user.model.js";
import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";
import {
  buildUpdateData,
  cleanValue,
} from "../../helpers/buildUpdateProfileData.js";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter.js";

export const getProfileUser = async (req, res) => {
  try {
    const userId = res.locals.user.id;

    const user = await User.findOne({
      _id: new Types.ObjectId(userId),
      isActive: true,
      deleted: false,
    }).select(
      "-password -deleted -deleteAt -__v -role_id -createdAt -updatedAt"
    );
    console.log("✅ Thông tin người dùng tìm thấy:", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("❌ Lỗi khi lấy thông tin người dùng:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const updateProfileUser = async (req, res) => {
  try {
    const userId = res.locals.user.id;

    console.log("📝 Request body:", req.body);

    // Lấy dữ liệu gửi lên
    let updateData = buildUpdateData(req.body, ["introduction"]);

    console.log("📦 Update data after buildUpdateData:", updateData);

    // Xử lý introduction nếu có
    if (req.body.introduction) {
      try {
        const lines = JSON.parse(req.body.introduction);
        updateData.introduction = lines.map((line) =>
          capitalizeFirstLetter(line)
        );
      } catch (err) {
        console.error("Invalid JSON for introduction:", req.body.introduction);
      }
    }

    // Xử lý avatar
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer, "users");
      updateData.avatar = uploaded.secure_url;
    } else if (req.body.avatar !== undefined) {
      updateData.avatar = cleanValue(req.body.avatar);
    }

    // Lấy dữ liệu cũ
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại" });
    }

    // Kiểm tra dữ liệu có thay đổi không
    const hasChange = Object.entries(updateData).some(([key, value]) => {
      // JSON stringify để so sánh mảng/object
      const oldValue = currentUser[key];
      if (Array.isArray(value) || typeof value === "object") {
        return JSON.stringify(oldValue) !== JSON.stringify(value);
      }
      return oldValue !== value;
    });

    if (!hasChange) {
      return res
        .status(200)
        .json({ success: true, message: "Không có dữ liệu thay đổi" });
    }

    // Cập nhật
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select(
      "-password -deleted -deleteAt -__v -role_id -createdAt -updatedAt"
    );

    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
