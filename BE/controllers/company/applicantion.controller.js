import { Types } from "mongoose";
import Application from "../../models/application.model.js";

export const updateApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id, status);

    const updated = await Application.findByIdAndUpdate(
      {
        _id: new Types.ObjectId(id),
      },
      {
        status: status,
      },
      {
        new: true,
      }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Applicant not found" });
    }
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
