import Job from "../../models/job.model.js";
import Company from "../../models/company.model.js";
import User from "../../models/user.model.js";
import { buildJobFilter } from "../../helpers/queryFilter.js";

export const getAllJobs = async (req, res) => {
  try {
   
    const filter = buildJobFilter(req.query);

    const jobs = await Job.find(filter)
      .populate({
        path: "company",
        select: "logo user slug",
        populate: {
          path: "user",
          select: "fullName",
        },
      })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: jobs,
      total: jobs.length,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách việc làm",
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching job with ID:", id);
    const job = await Job.findById({ _id: id }).populate({
      path: "company",
      populate: {
        path: "user",
        select: "fullName email",
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy việc làm",
      });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin việc làm",
    });
  }
};
