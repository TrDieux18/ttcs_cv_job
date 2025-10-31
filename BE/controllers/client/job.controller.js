import Job from "../../models/job.model.js";
import Company from "../../models/company.model.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate({
        path: "company",
        select: "website logo headline location",
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách việc làm",
    });
  }
};
