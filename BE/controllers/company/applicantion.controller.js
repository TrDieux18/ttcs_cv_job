import { Types } from "mongoose";
import Application from "../../models/application.model.js";
import Notification from "../../models/notification.model.js";
import { sendApplicationStatusEmail } from "../../configs/email.js";

export const updateApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id, status);

    const updated = await Application.findByIdAndUpdate(
      {
        _id: new Types.ObjectId(id),
      },
      {
        status: status,
      },
      {
        new: true,
      }
    )
      .populate("user", "_id fullName email")
      .populate("job", "title");

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Applicant not found" });
    }

    const statusMessages = {
      pending: "Đơn ứng tuyển của bạn đang được xem xét",
      reviewing: "Đơn ứng tuyển của bạn đang được đánh giá",
      reviewed: "Đơn ứng tuyển của bạn đã được xem xét",
      accepted: "Chúc mừng! Đơn ứng tuyển của bạn đã được chấp nhận",
      rejected: "Đơn ứng tuyển của bạn đã bị từ chối",
    };

    const notification = await Notification.create({
      user: updated.user._id,
      type: "application_status",
      title: "Cập nhật trạng thái ứng tuyển",
      message:
        statusMessages[status] ||
        `Trạng thái ứng tuyển của bạn đã được cập nhật thành ${status}`,
      application: updated._id,
      job: updated.job._id,
      read: false,
    });

    const io = req.app.get("io");
    if (io) {
      io.to(`user_${updated.user._id}`).emit("notification", {
        ...notification.toObject(),
        job: { title: updated.job.title },
      });
    }

    sendApplicationStatusEmail({
      to: updated.user.email,
      fullName: updated.user.fullName,
      jobTitle: updated.job.title,
      status: status,
      companyName: res.locals.user?.fullName || "Công ty",
    }).catch((error) => {
      console.error("Failed to send email:", error);
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating applicant:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
