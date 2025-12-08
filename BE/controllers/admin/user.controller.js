import UserDTO from "../../dtos/user.dto.js";
import { formatName } from "../../helpers/formatName.js";
import User from "../../models/user.model.js";
import { uploadToCloudinary } from "../../middlewares/admin/uploadCloudinary.middleware.js";
import { buildUserFilter } from "../../helpers/queryFilter.js";

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "", isActive = "all" } = req.query;

    const filter = buildUserFilter(req.query);

    filter.deleted = false;

    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ fullName: regex }, { username: regex }, { email: regex }];
    }

    if (isActive !== "all") {
      filter.isActive = isActive === "true";
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
      User.find(filter)
        .populate("role_id", "title")
        .skip(skip)
        .limit(Number(limit))
        .sort({ username: 1 }),
      User.countDocuments(filter),
    ]);

    const results = users.map((user) => new UserDTO(user));

    return res.json({
      success: true,
      data: results,
      total,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách người dùng",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("role_id", "title");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { fullName, username, email, isActive, role_id, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập đã tồn tại!",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email đã được sử dụng!",
      });
    }

    const formattedName = formatName(fullName);

    const newUser = new User({
      fullName: formattedName,
      username,
      email,
      isActive,
      role_id,
      password,
      avatar: req.file
        ? (await uploadToCloudinary(req.file.buffer, "users")).secure_url
        : req.body.avatar,
    });

    const userSave = await newUser.save();

    res.status(201).json({ success: true, data: userSave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  let uploadedFile = null;
  try {
    const userId = req.params.id;
    const { fullName, username, email, isActive, role_id, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (fullName) user.fullName = formatName(fullName);
    if (username) user.username = username;
    if (email) user.email = email;
    if (typeof isActive !== "undefined") user.isActive = isActive;
    if (role_id) user.role_id = role_id;

    if (password) {
      user.password = password;
    }

    if (req.file) {
      uploadedFile = await uploadToCloudinary(req.file.buffer, "users");
      user.avatar = uploadedFile.secure_url;
    }

    const updatedUser = await user.save();

    return res.json({
      success: true,
      message: "Cập nhật người dùng thành công",
      data: updatedUser,
    });
  } catch (error) {
    if (uploadedFile?.public_id) {
      try {
        const cloudinary = (await import("../../configs/cloudinary.js"))
          .default;
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      } catch (rollbackErr) {}
    }
    console.error("Update user error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const changeUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { isActive } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isActive },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { deleted: true },
      { new: true }
    );
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
