import CV from "../../models/cv.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = res.locals.user.id.toString();
    const { jobId } = req.body;

    console.log("User ID:", userId);
    const cv = await CV.findOne({ userId }).select("_id");
    console.log("Found CV:", cv._id);
    //  console.log("Applying with CV:", cv);
    //  if (!cv) {
    //    return res
    //      .status(404)
    //      .json({ success: false, message: "CV not found for user" });
    //  }
  } catch (error) {
    console.error("submitApplication error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
