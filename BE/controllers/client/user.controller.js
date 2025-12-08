import { Types } from "mongoose";
import User from "../../models/user.model.js";
import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";
import {
  buildUpdateData,
  cleanValue,
} from "../../helpers/buildUpdateProfileData.js";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter.js";
import bcrypt from "bcrypt";

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

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const updateProfileUser = async (req, res) => {
  let uploadedFile = null;
  try {
    const userId = res.locals.user.id;

    let updateData = buildUpdateData(req.body, ["introduction"]);

    if (req.body.introduction) {
      try {
        const lines = JSON.parse(req.body.introduction);
        if (Array.isArray(lines) && lines.length > 0) {
          updateData.introduction = lines.map((line) =>
            capitalizeFirstLetter(line)
          );
        }
      } catch (err) {}
    }

    if (req.file) {
      uploadedFile = await uploadToCloudinary(req.file.buffer, "users");
      updateData.avatar = uploadedFile.secure_url;
    } else if (req.body.avatar !== undefined) {
      updateData.avatar = cleanValue(req.body.avatar);
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại" });
    }

    const hasChange = Object.entries(updateData).some(([key, value]) => {
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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select(
      "-password -deleted -deleteAt -__v -role_id -createdAt -updatedAt"
    );

    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    if (uploadedFile?.public_id) {
      try {
        const cloudinary = (await import("../../configs/cloudinary.js"))
          .default;
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      } catch (rollbackErr) {}
    }
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp đầy đủ thông tin",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu mới phải có ít nhất 6 ký tự",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu hiện tại không đúng",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
