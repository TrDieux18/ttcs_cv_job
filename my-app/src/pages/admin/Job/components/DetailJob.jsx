import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Descriptions,
  Button,
  Spin,
  message,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { getJobByIdAdmin } from "@services/admin/JobService";
import { reportJob } from "@services/admin/ReportService";

const { TextArea } = Input;

const DetailJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportForm] = Form.useForm();
  const [submittingReport, setSubmittingReport] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await getJobByIdAdmin(id);
        if (response.success) {
          setJob(response.data);
        } else {
          message.error("Không thể tải thông tin việc làm");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        message.error("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleReportSubmit = async (values) => {
    try {
      setSubmittingReport(true);

      const response = await reportJob(job._id, values);

      if (response.success) {
        message.success(
          "Đã gửi báo cáo vi phạm thành công! Thông báo đã được gửi đến công ty."
        );
        setReportModalVisible(false);
        reportForm.resetFields();
      } else {
        message.error(response.message || "Gửi báo cáo thất bại");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      message.error(error.response?.data?.message || "Gửi báo cáo thất bại");
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="text-center py-20">
          <p className="text-gray-500">Không tìm thấy thông tin việc làm</p>
        </div>
      </div>
    );
  }

  const jobTypeColors = {
    "Full-time": "blue",
    "Part-time": "green",
    Contract: "orange",
    Internship: "purple",
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-full">
        {}
        <div className="mb-6">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/admin/jobs")}
            className="mb-4"
          >
            Quay lại
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Chi tiết việc làm
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Xem thông tin chi tiết của việc làm
              </p>
            </div>
            <Button
              danger
              icon={<WarningOutlined />}
              size="large"
              onClick={() => setReportModalVisible(true)}
            >
              Báo cáo vi phạm
            </Button>
          </div>
        </div>

        {}
        <Card className="shadow-sm">
          <Space direction="vertical" size="large" className="w-full">
            {}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {job.title}
              </h2>

              <Space size="large" wrap className="text-gray-600">
                <span className="flex items-center gap-2">
                  <EnvironmentOutlined />
                  {job.location}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-2">
                    <DollarOutlined />
                    {job.salary}
                  </span>
                )}
                <Tag color={jobTypeColors[job.jobType] || "default"}>
                  {job.jobType}
                </Tag>
                {job.isFeatured && <Tag color="gold">⭐ Nổi bật</Tag>}
              </Space>
            </div>

            {}
            <Card type="inner" title="Thông tin công ty" className="bg-blue-50">
              <Space direction="vertical" size="small" className="w-full">
                <div className="font-semibold text-lg text-gray-900">
                  {job.company?.headline || "—"}
                </div>
                {job.company?.location && (
                  <div className="text-gray-600">
                    <EnvironmentOutlined /> {job.company.location}
                  </div>
                )}
                {job.company?.website && (
                  <div>
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {job.company.website}
                    </a>
                  </div>
                )}
              </Space>
            </Card>

            {}
            <Descriptions
              bordered
              column={1}
              labelStyle={{
                fontWeight: 600,
                backgroundColor: "#fafafa",
                width: "200px",
              }}
              contentStyle={{ backgroundColor: "#fff" }}
            >
              <Descriptions.Item label="Mô tả công việc">
                <div className="whitespace-pre-wrap">{job.description}</div>
              </Descriptions.Item>

              {job.requirements && (
                <Descriptions.Item label="Yêu cầu">
                  <div className="whitespace-pre-wrap">{job.requirements}</div>
                </Descriptions.Item>
              )}

              {job.benefits && (
                <Descriptions.Item label="Quyền lợi">
                  <div className="whitespace-pre-wrap">{job.benefits}</div>
                </Descriptions.Item>
              )}

              <Descriptions.Item label="Cấp bậc">
                {job.level || "—"}
              </Descriptions.Item>

              <Descriptions.Item label="Số lượng tuyển">
                <UserOutlined /> {job.hiringQuantity || 1} người
              </Descriptions.Item>

              <Descriptions.Item label="Yêu cầu giới tính">
                {job.genderRequirement || "Không yêu cầu"}
              </Descriptions.Item>

              <Descriptions.Item label="Yêu cầu bằng cấp">
                {job.degreeRequirement || "Không yêu cầu"}
              </Descriptions.Item>

              <Descriptions.Item label="Yêu cầu kinh nghiệm">
                {job.experienceRequirement || "Không yêu cầu kinh nghiệm"}
              </Descriptions.Item>

              {job.specificAddress && (
                <Descriptions.Item label="Địa chỉ cụ thể">
                  {job.specificAddress}
                </Descriptions.Item>
              )}

              {job.applicationDeadline && (
                <Descriptions.Item label="Hạn ứng tuyển">
                  <CalendarOutlined />{" "}
                  {new Date(job.applicationDeadline).toLocaleDateString(
                    "vi-VN"
                  )}
                </Descriptions.Item>
              )}

              {job.category && (
                <Descriptions.Item label="Danh mục">
                  <Tag>{job.category}</Tag>
                </Descriptions.Item>
              )}

              {job.keywords && job.keywords.length > 0 && (
                <Descriptions.Item label="Từ khóa">
                  <Space wrap>
                    {job.keywords.map((keyword, index) => (
                      <Tag key={index} color="blue">
                        {keyword}
                      </Tag>
                    ))}
                  </Space>
                </Descriptions.Item>
              )}

              <Descriptions.Item label="Ngày đăng">
                {new Date(job.createdAt).toLocaleString("vi-VN")}
              </Descriptions.Item>

              <Descriptions.Item label="Cập nhật lần cuối">
                {new Date(job.updatedAt).toLocaleString("vi-VN")}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Card>

        {}
        <Modal
          title={
            <Space>
              <WarningOutlined className="text-red-500" />
              <span>Báo cáo vi phạm</span>
            </Space>
          }
          open={reportModalVisible}
          onCancel={() => {
            setReportModalVisible(false);
            reportForm.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={reportForm}
            layout="vertical"
            onFinish={handleReportSubmit}
          >
            <Form.Item
              name="reason"
              label="Lý do báo cáo"
              rules={[{ required: true, message: "Vui lòng chọn lý do" }]}
            >
              <Select
                placeholder="Chọn lý do báo cáo"
                size="large"
                options={[
                  { value: "spam", label: "Spam / Quảng cáo" },
                  { value: "fake", label: "Tin tuyển dụng giả" },
                  { value: "scam", label: "Lừa đảo" },
                  { value: "inappropriate", label: "Nội dung không phù hợp" },
                  { value: "duplicate", label: "Tin trùng lặp" },
                  { value: "expired", label: "Tin đã hết hạn" },
                  { value: "other", label: "Lý do khác" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả chi tiết"
              rules={[
                { required: true, message: "Vui lòng mô tả chi tiết" },
                { min: 20, message: "Mô tả phải có ít nhất 20 ký tự" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Vui lòng mô tả chi tiết về vi phạm..."
                showCount
                maxLength={500}
              />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  setReportModalVisible(false);
                  reportForm.resetFields();
                }}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                danger
                htmlType="submit"
                loading={submittingReport}
              >
                Gửi báo cáo
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default DetailJob;
