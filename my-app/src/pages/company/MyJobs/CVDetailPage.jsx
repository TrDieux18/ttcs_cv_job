import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, message, Tag, Spin, Select, Descriptions } from "antd";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import { updateStatusApplicant } from "@services/company/ApplicantService";

const { Option } = Select;

const StatusTag = ({ status }) => {
  const map = {
    pending: { color: "blue", label: "Chờ xử lý" },
    reviewing: { color: "orange", label: "Đang xem xét" },
    reviewed: { color: "purple", label: "Đã xem xét" },
    accepted: { color: "green", label: "Đã chấp nhận" },
    rejected: { color: "red", label: "Từ chối" },
  };
  const config = map[status] || { color: "default", label: status };
  return <Tag color={config.color}>{config.label}</Tag>;
};

export default function CVDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applicant, setApplicant] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setApplicant({
        _id: id,
        user: {
          fullName: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0123456789",
        },
        cv: {
          title: "Senior Frontend Developer",
          fileUrl: "https://example.com/cv.pdf",
        },
        job: {
          title: "Frontend Developer Position",
        },
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await updateStatusApplicant(id, newStatus);
      if (res.success) {
        messageApi.success("Cập nhật trạng thái thành công");
        setApplicant({ ...applicant, status: newStatus });
      } else {
        messageApi.error(res.message || "Cập nhật thất bại");
      }
    } catch (error) {
      messageApi.error("Cập nhật thất bại");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-600">Không tìm thấy CV</h2>
          <Button
            type="primary"
            onClick={() => navigate("/company/cvs")}
            className="mt-4"
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {contextHolder}

      <div className="mx-auto max-w-5xl px-8 py-6">
        <div className="mb-6">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/company/cvs")}
            className="mb-4"
          >
            Quay lại
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Chi tiết ứng viên
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Xem thông tin và quản lý trạng thái ứng viên
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Trạng thái:</span>
              <Select
                value={applicant.status}
                onChange={handleStatusChange}
                loading={updating}
                style={{ width: 160 }}
                className="!rounded-lg"
              >
                <Option value="pending">Chờ xử lý</Option>
                <Option value="reviewing">Đang xem xét</Option>
                <Option value="reviewed">Đã xem xét</Option>
                <Option value="accepted">Đã chấp nhận</Option>
                <Option value="rejected">Từ chối</Option>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="shadow-sm border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin ứng viên
            </h3>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Họ và tên" span={2}>
                <span className="font-medium">{applicant.user.fullName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {applicant.user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {applicant.user.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Vị trí ứng tuyển" span={2}>
                <span className="font-medium">{applicant.job.title}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Tiêu đề CV" span={2}>
                {applicant.cv.title}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={2}>
                <StatusTag status={applicant.status} />
              </Descriptions.Item>
              <Descriptions.Item label="Ngày ứng tuyển" span={2}>
                {new Date(applicant.createdAt).toLocaleString("vi-VN")}
              </Descriptions.Item>
            </Descriptions>

            <div className="mt-6">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                href={applicant.cv.fileUrl}
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Tải xuống CV
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
