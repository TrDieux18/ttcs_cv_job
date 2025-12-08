import User from "../../models/user.model.js";
import Job from "../../models/job.model.js";
import Company from "../../models/company.model.js";
import CV from "../../models/cv.model.js";
import Application from "../../models/application.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalJobs, totalCompanies, totalCVs, totalApplications] =
      await Promise.all([
        User.countDocuments(),
        Job.countDocuments(),
        Company.countDocuments(),
        CV.countDocuments(),
        Application.countDocuments(),
      ]);

    return res.json({
      success: true,
      data: {
        totalUsers,
        totalJobs,
        totalCompanies,
        totalCVs,
        totalApplications,
      },
    });
  } catch (error) {
    console.error("getDashboardStats error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const getMonthlyStats = async (req, res) => {
  try {
    const { months = 6 } = req.query;
    const monthsNumber = Number(months);

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthsNumber);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const [jobStats, applicationStats, cvStats] = await Promise.all([
      Job.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Application.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      CV.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    const monthNames = [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ];
    const result = [];

    for (let i = monthsNumber - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const jobCount =
        jobStats.find((s) => s._id.year === year && s._id.month === month)
          ?.count || 0;

      const applicationCount =
        applicationStats.find(
          (s) => s._id.year === year && s._id.month === month
        )?.count || 0;

      const cvCount =
        cvStats.find((s) => s._id.year === year && s._id.month === month)
          ?.count || 0;

      result.push({
        month: monthNames[month - 1],
        jobs: jobCount,
        applications: applicationCount,
        cvs: cvCount,
      });
    }

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("getMonthlyStats error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const limitNumber = Number(limit);

    const [
      recentJobs,
      recentApplications,
      recentCVs,
      recentUsers,
      recentCompanies,
    ] = await Promise.all([
      Job.find()
        .populate("company", "headline")
        .sort({ createdAt: -1 })
        .limit(2)
        .select("title company createdAt"),
      Application.find()
        .populate("user", "fullName")
        .populate("job", "title")
        .sort({ createdAt: -1 })
        .limit(2)
        .select("user job status createdAt"),
      CV.find()
        .populate("userId", "fullName")
        .sort({ createdAt: -1 })
        .limit(1)
        .select("title userId createdAt"),
      User.find()
        .sort({ createdAt: -1 })
        .limit(1)
        .select("fullName email createdAt"),
      Company.find()
        .populate("user", "fullName")
        .sort({ createdAt: -1 })
        .limit(1)
        .select("headline user createdAt"),
    ]);

    const activities = [];

    recentJobs.forEach((job) => {
      activities.push({
        id: job._id,
        type: "job",
        title: job.title,
        company: job.company?.headline || "N/A",
        time: job.createdAt,
        status: "active",
      });
    });

    recentApplications.forEach((app) => {
      activities.push({
        id: app._id,
        type: "application",
        title: `${app.user?.fullName || "N/A"} ứng tuyển`,
        company: app.job?.title || "N/A",
        time: app.createdAt,
        status: app.status === "pending" ? "pending" : "completed",
      });
    });

    recentCVs.forEach((cv) => {
      activities.push({
        id: cv._id,
        type: "cv",
        title: "CV mới được tạo",
        company: cv.userId?.fullName || "N/A",
        time: cv.createdAt,
        status: "completed",
      });
    });

    recentUsers.forEach((user) => {
      activities.push({
        id: user._id,
        type: "user",
        title: "Người dùng mới đăng ký",
        company: user.fullName || user.email,
        time: user.createdAt,
        status: "active",
      });
    });

    recentCompanies.forEach((company) => {
      activities.push({
        id: company._id,
        type: "company",
        title: "Công ty mới đăng ký",
        company: company.headline || company.user?.fullName || "N/A",
        time: company.createdAt,
        status: "pending",
      });
    });

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const limitedActivities = activities.slice(0, limitNumber);

    const formattedActivities = limitedActivities.map((activity) => {
      const now = new Date();
      const activityTime = new Date(activity.time);
      const diff = now - activityTime;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      let timeAgo;
      if (minutes < 60) {
        timeAgo = `${minutes} phút trước`;
      } else if (hours < 24) {
        timeAgo = `${hours} giờ trước`;
      } else {
        timeAgo = `${days} ngày trước`;
      }

      return {
        ...activity,
        time: timeAgo,
      };
    });

    return res.json({
      success: true,
      data: formattedActivities,
    });
  } catch (error) {
    console.error("getRecentActivities error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
