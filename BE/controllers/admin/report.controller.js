import Job from "../../models/job.model.js";
import Company from "../../models/company.model.js";
import Notification from "../../models/notification.model.js";

export const reportJob = async (req, res) => {
  try {
    const { jobId, reason, description } = req.body;
    const reporterId = res.locals.user.id;

    if (!jobId || !reason || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const job = await Job.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const company = await Company.findById(job.company._id).populate("user");
    if (!company || !company.user) {
      return res.status(404).json({
        success: false,
        message: "Company owner not found",
      });
    }

    const reasonLabels = {
      spam: "Spam / Quảng cáo",
      fake: "Tin tuyển dụng giả",
      scam: "Lừa đảo",
      inappropriate: "Nội dung không phù hợp",
      duplicate: "Tin trùng lặp",
      expired: "Tin đã hết hạn",
      other: "Lý do khác",
    };

    const notification = await Notification.create({
      user: company.user._id,
      type: "other",
      title: "⚠️ Tin tuyển dụng bị báo cáo vi phạm",
      message: `Tin "${job.title}" của bạn đã bị báo cáo với lý do: ${
        reasonLabels[reason] || reason
      }. Mô tả: ${description}`,
      job: jobId,
      company: company._id,
      read: false,
    });

    return res.json({
      success: true,
      message: "Report submitted successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Error reporting job:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
