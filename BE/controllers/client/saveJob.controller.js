import { Types } from "mongoose";
import SavedJob from "../../models/savedJob.model.js";

export const getSavedJobByUser = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const savedJobs = await SavedJob.find({
      user: new Types.ObjectId(userId),
    }).populate({
      path: "job",
      populate: { path: "company" },
    });

    res.status(200).json({ success: true, data: savedJobs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = res.locals.user.id;

    const savedJob = await SavedJob.create({
      user: new Types.ObjectId(userId),
      job: new Types.ObjectId(jobId),
    });

    if (!savedJob) {
      return res.status(400).json({ message: "Lưu việc thất bại" });
    }
    res.status(201).json({ success: true, data: savedJob });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const deletedSavedJob = await SavedJob.findOneAndDelete({
      job: new Types.ObjectId(jobId),
    });
    if (!deletedSavedJob) {
      return res.status(400).json({ message: "Xóa việc đã lưu thất bại" });
    }
    res.status(200).json({ success: true, data: deletedSavedJob });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCountSavedJobsByUser = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const count = await SavedJob.countDocuments({
      user: new Types.ObjectId(userId),
    });
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
