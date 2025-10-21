import Role from "../../models/role.model.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ deleted: false }).select(
      "_id title description"
    );
    if (!roles) {
      return res
        .status(404)
        .json({ success: false, message: "No roles found" });
    }
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
