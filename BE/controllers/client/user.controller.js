import User from "../../models/user.model.js";

export const getProfileUser = async (req, res) => {
  try {
    const userId = res.locals.userId;

    const user = await User.findOne({
      _id: userId,
      isActive: true,
      deleted: false,
    })
      .select("-password")
      .populate("role_id");
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
