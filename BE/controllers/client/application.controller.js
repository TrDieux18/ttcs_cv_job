import { Types } from "mongoose";
import Application from "../../models/application.model.js";
import CV from "../../models/cv.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { jobId } = req.body;

    const cv = await CV.findOne({ userId: new Types.ObjectId(userId) }).select(
      "_id"
    );

    if (!cv) {
      return res
        .status(404)
        .json({ success: false, message: "CV not found for the user" });
    }

    const newApplication = new Application({
      user: userId,
      job: jobId,
      cv: cv._id.toString(),
    });

    const savedApplication = await newApplication.save();
    return res.status(201).json({ success: true, data: savedApplication });
  } catch (error) {
    console.error("submitApplication error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const userId = res.locals.user.id;

    const applications = await Application.find({
      user: new Types.ObjectId(userId),
    }).populate({
      path: "job",
      populate: { path: "company" },
    });

    return res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("getMyApplications error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCountOfApplicantsByUserId = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const count = await Application.countDocuments({
      user: new Types.ObjectId(userId),
    });

    return res.status(200).json({ success: true, data: count });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
