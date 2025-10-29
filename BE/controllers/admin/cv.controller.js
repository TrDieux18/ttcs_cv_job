import CV from "../../models/cv.model.js";

export const getAllCvs = async (req, res) => {
  try {
    const cvs = await CV.find()
      .populate("userId", "fullName email avatar")
      .lean();
    res.status(200).json({ success: true, data: cvs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching CVs", error });
  }
};
