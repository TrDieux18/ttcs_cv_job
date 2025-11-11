import CV from "../../models/cv.model.js";
import { buildCVFilter } from "../../helpers/queryFilter.js";

export const getAllCvs = async (req, res) => {
  try {
    // Sử dụng helper để build filter
    const filter = buildCVFilter(req.query);

    const cvs = await CV.find(filter)
      .populate("userId", "fullName email avatar")
      .lean();
    
    res.status(200).json({ 
      success: true, 
      data: cvs,
      total: cvs.length 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching CVs", error });
  }
};
