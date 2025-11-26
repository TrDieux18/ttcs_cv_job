import nodemailer from "nodemailer";

let transporter = null;

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn(
      "⚠️  Email credentials not configured. Email notifications will be disabled."
    );
    return null;
  }

  try {
    const port = parseInt(process.env.EMAIL_PORT || 587);
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: port,
      secure: port === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } catch (error) {
    console.error("Failed to create email transporter:", error);
    return null;
  }
};

transporter = createTransporter();

export const sendEmail = async ({ to, subject, html }) => {
  if (!transporter) {
    console.log("Email not sent (transporter not configured):", subject);
    return { success: false, error: "Email service not configured" };
  }

  try {
    const info = await transporter.sendMail({
      from: `no-reply@binh-dev.io.vn`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return { success: false, error: error.message };
  }
};

export const sendApplicationStatusEmail = async ({
  to,
  fullName,
  jobTitle,
  status,
  companyName,
}) => {
  const statusMessages = {
    pending: {
      subject: "Đơn ứng tuyển đang được xem xét",
      message: "Đơn ứng tuyển của bạn đang được xem xét",
      color: "#ffa940",
    },
    reviewing: {
      subject: "Đơn ứng tuyển đang được đánh giá",
      message: "Đơn ứng tuyển của bạn đang được đánh giá",
      color: "#1890ff",
    },
    reviewed: {
      subject: "Đơn ứng tuyển đã được xem xét",
      message: "Đơn ứng tuyển của bạn đã được xem xét",
      color: "#52c41a",
    },
    accepted: {
      subject: "Chúc mừng! Đơn ứng tuyển được chấp nhận",
      message: "Chúc mừng! Đơn ứng tuyển của bạn đã được chấp nhận",
      color: "#52c41a",
    },
    rejected: {
      subject: "Thông báo về đơn ứng tuyển",
      message: "Đơn ứng tuyển của bạn đã bị từ chối",
      color: "#ff4d4f",
    },
  };

  const statusInfo = statusMessages[status] || statusMessages.pending;

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, sans-serif;
        background: #f3f4f6;
        margin: 0;
        padding: 20px;
        color: #333;
      }

      .container {
        max-width: 620px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        border: 1px solid #e5e7eb;
      }

      .header {
        background: linear-gradient(135deg, #5568d3 0%, #764ba2 100%);
        padding: 32px;
        text-align: center;
        color: #ffffff;
      }

      .header h1 {
        margin: 0;
        font-size: 26px;
        letter-spacing: 0.5px;
        font-weight: 600;
      }

      .content {
        padding: 30px;
        font-size: 15px;
        line-height: 1.7;
      }

      .status-badge {
        display: inline-block;
        padding: 10px 22px;
        border-radius: 30px;
        font-weight: 600;
        font-size: 14px;
        margin: 20px 0;
        background-color: ${statusInfo.color}15;
        color: ${statusInfo.color};
        border: 2px solid ${statusInfo.color};
      }

      .job-info {
        background: #f8fafc;
        padding: 20px 22px;
        border-radius: 10px;
        margin-top: 25px;
        border-left: 4px solid #5568d3;
      }

      .job-info h3 {
        margin: 0 0 8px 0;
        font-size: 17px;
        color: #1f2937;
      }

      .job-info p {
        margin: 4px 0;
        font-size: 15px;
      }

      .button {
        display: inline-block;
        margin-top: 25px;
        padding: 14px 28px;
        background: #5568d3;
        color: white;
        text-decoration: none;
        font-weight: 600;
        border-radius: 6px;
        font-size: 15px;
        transition: 0.25s;
      }

      .button:hover {
        background: #4454b5;
      }

      .footer {
        text-align: center;
        padding: 18px;
        font-size: 13px;
        background: #f9fafb;
        color: #6b7280;
        border-top: 1px solid #e5e7eb;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h1>📋 Cập Nhật Trạng Thái Ứng Tuyển</h1>
      </div>

      <div class="content">
        <p>Xin chào <strong>${fullName}</strong>,</p>

        <p>${statusInfo.message}</p>

        <div class="status-badge">
          ${statusInfo.subject}
        </div>

        <div class="job-info">
          <h3>💼 Thông tin công việc</h3>
          <p><strong>Vị trí:</strong> ${jobTitle}</p>
          ${
            companyName ? `<p><strong>Công ty:</strong> ${companyName}</p>` : ""
          }
        </div>

        <p style="margin-top: 25px">
          Vui lòng đăng nhập vào hệ thống để xem chi tiết hồ sơ của bạn.
        </p>

        <center>
          <a href="${
            process.env.ORIGIN_URL || "http://localhost:2303"
          }/dashboard/my-jobs" class="button">
            Xem Chi Tiết
          </a>
        </center>
      </div>

      <div class="footer">
        Email này được gửi tự động từ hệ thống CV Management.  
        <br/>Vui lòng không phản hồi email này.
      </div>
    </div>
  </body>
</html>
`;

  return await sendEmail({
    to,
    subject: `[IT Jobs] ${statusInfo.subject}`,
    html,
  });
};

export default transporter;
