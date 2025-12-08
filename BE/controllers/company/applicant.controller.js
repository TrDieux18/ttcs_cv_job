import Application from "../../models/application.model.js";
import Job from "../../models/job.model.js";
import Company from "../../models/company.model.js";
import { Types } from "mongoose";

export const getAllApplicants = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { page = 1, limit = 10, status, keyword } = req.query;

    const company = await Company.findOne({ user: new Types.ObjectId(userId) });

    if (!company) {
      return res.json({
        success: true,
        data: {
          applications: [],
          pagination: { total: 0, page: 1, limit: Number(limit) },
        },
      });
    }

    const jobs = await Job.find({
      company: company._id,
    }).select("_id");

    if (!jobs || jobs.length === 0) {
      return res.json({
        success: true,
        data: {
          applications: [],
          pagination: { total: 0, page: Number(page), limit: Number(limit) },
        },
      });
    }

    const jobIds = jobs.map((job) => job._id);

    const filter = {
      job: { $in: jobIds },
    };

    if (status) {
      filter.status = status;
    }

    if (keyword && keyword.trim()) {
      const regex = new RegExp(keyword.trim(), "i");
      const User = (await import("../../models/user.model.js")).default;
      const users = await User.find({
        $or: [{ fullName: regex }, { email: regex }],
      }).select("_id");

      const userIds = users.map((u) => u._id);
      filter.user = { $in: userIds };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [applicants, total] = await Promise.all([
      Application.find(filter)
        .populate("user", "fullName email phone")
        .populate("cv", "title fileUrl")
        .populate("job", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Application.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: {
        applications: applicants,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
        },
      },
    });
  } catch (error) {
    console.error("getAllApplicants error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const getApplicantStats = async (req, res) => {
  try {
    const userId = res.locals.user.id;

    const company = await Company.findOne({ user: new Types.ObjectId(userId) });

    if (!company) {
      return res.json({
        success: true,
        data: {
          total: 0,
          pending: 0,
          reviewed: 0,
          accepted: 0,
          rejected: 0,
        },
      });
    }

    const jobs = await Job.find({
      company: company._id,
    }).select("_id");

    if (!jobs || jobs.length === 0) {
      return res.json({
        success: true,
        data: {
          total: 0,
          pending: 0,
          reviewed: 0,
          accepted: 0,
          rejected: 0,
        },
      });
    }

    const jobIds = jobs.map((job) => job._id);

    const [total, pending, reviewed, accepted, rejected] = await Promise.all([
      Application.countDocuments({
        job: { $in: jobIds },
      }),
      Application.countDocuments({
        job: { $in: jobIds },
        status: "pending",
      }),
      Application.countDocuments({
        job: { $in: jobIds },
        status: "reviewed",
      }),
      Application.countDocuments({
        job: { $in: jobIds },
        status: "accepted",
      }),
      Application.countDocuments({
        job: { $in: jobIds },
        status: "rejected",
      }),
    ]);

    return res.json({
      success: true,
      data: {
        total,
        pending,
        reviewed,
        accepted,
        rejected,
      },
    });
  } catch (error) {
    console.error("getApplicantStats error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const getRecruitmentReport = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { dateFrom, dateTo } = req.query;

    const company = await Company.findOne({ user: new Types.ObjectId(userId) });

    if (!company) {
      return res.json({
        success: true,
        data: {
          jobStats: [],
          summary: {
            totalJobs: 0,
            totalCVs: 0,
            pending: 0,
            reviewed: 0,
            accepted: 0,
            rejected: 0,
          },
        },
      });
    }

    const jobFilter = {
      company: company._id,
    };

    if (dateFrom || dateTo) {
      jobFilter.createdAt = {};
      if (dateFrom) {
        jobFilter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        jobFilter.createdAt.$lte = endDate;
      }
    }

    const jobs = await Job.find(jobFilter)
      .select("_id title createdAt")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.json({
        success: true,
        data: {
          items: [],
          summary: {
            totalJobs: 0,
            totalCVs: 0,
            pending: 0,
            reviewed: 0,
            accepted: 0,
            rejected: 0,
          },
        },
      });
    }

    const items = await Promise.all(
      jobs.map(async (job) => {
        const [total, pending, reviewed, accepted, rejected] =
          await Promise.all([
            Application.countDocuments({ job: job._id }),
            Application.countDocuments({
              job: job._id,
              status: "pending",
            }),
            Application.countDocuments({
              job: job._id,
              status: "reviewed",
            }),
            Application.countDocuments({
              job: job._id,
              status: "accepted",
            }),
            Application.countDocuments({
              job: job._id,
              status: "rejected",
            }),
          ]);

        return {
          jobId: job._id,
          jobTitle: job.title,
          postedAt: job.createdAt,
          totalCVs: total,
          pending,
          reviewed,
          accepted,
          rejected,
        };
      })
    );

    const summary = items.reduce(
      (acc, item) => ({
        totalJobs: acc.totalJobs + 1,
        totalCVs: acc.totalCVs + item.totalCVs,
        pending: acc.pending + item.pending,
        reviewed: acc.reviewed + item.reviewed,
        accepted: acc.accepted + item.accepted,
        rejected: acc.rejected + item.rejected,
      }),
      {
        totalJobs: 0,
        totalCVs: 0,
        pending: 0,
        reviewed: 0,
        accepted: 0,
        rejected: 0,
      }
    );

    return res.json({
      success: true,
      data: {
        jobStats: items,
        summary,
      },
    });
  } catch (error) {
    console.error("getRecruitmentReport error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
