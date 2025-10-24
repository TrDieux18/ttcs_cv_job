import UserDTO from "../../dtos/user.dto.js";
import User from "../../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ deleted: false }).populate(
      "role_id",
      "title"
    );
    // console.log(users);
    const results = users.map((user) => new UserDTO(user));
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    const newUser = new User({
      fullName,
      username,
      email,
      isActive,
      role_id,
      password,
      avatar: req.file ? `/uploads/${req.file.filename}` : req.body.avatar,
    });

    const userSave = await newUser.save();
    // console.log(userSave);
    res.status(201).json({ success: true, data: userSave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName, username, email, isActive, role_id, password } = req.body;
    const updateData = {
      fullName,
      username,
      email,
      isActive,
      role_id,
      password,
    };
    if (req.file) {
      updateData.avatar = `/uploads/${req.file.filename}`;
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
