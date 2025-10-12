import { JWT_SECRET } from "../../config/system.js";
import { AccountDTO } from "../../dtos/account.dto.js";
import Account from "../../models/account.model.js";
import Role from "../../models/role.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Lấy thông tin tài khoản (nếu cần xác minh DB)
    const account = await Account.findById(decoded.id).select("-password");
    if (!account || !account.isActive || account.deleted)
      return res.status(403).json({ success: false, message: "Forbidden" });

    // ✅ Gắn vào res.locals.user
    res.locals.user = {
      id: account._id,
      fullName: account.fullName,
      username: account.username,
      role: decoded.role,
    };
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
