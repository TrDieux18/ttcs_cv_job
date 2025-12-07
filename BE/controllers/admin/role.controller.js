import Role from "../../models/role.model.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ deleted: false });
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

export const createRole = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newRole = new Role({ title, description });
    await newRole.save();
    res.status(201).json({ success: true, data: newRole });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { title, description } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      {
        _id: roleId,
      },
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updatedRole) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateRolePermissions = async (req, res) => {
  try {
    const updates = [];

    for (const item of req.body) {
      const { _id, permissions } = item;

      const updated = await Role.findByIdAndUpdate(
        _id,
        { $set: { permissions } },
        { new: true }
      );

      updates.push(updated);
    }

    res.status(200).json({ success: true, data: updates });
  } catch (error) {
    console.error("Error updating role permissions:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
