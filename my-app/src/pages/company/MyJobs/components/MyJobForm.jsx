import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  createMyJob,
  updateMyJob,
  getMyJobById,
} from "@services/company/JobService";
import dayjs from "dayjs";

const { TextArea } = Input;

const MyJobForm = ({ mode }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "update";

  useEffect(() => {
    if (isEdit && id) {
      fetchJob();
    }
  }, [id, isEdit]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await getMyJobById(id);
      if (response.data) {
        form.setFieldsValue({
          ...response.data,
          applicationDeadline: response.data.applicationDeadline
            ? dayjs(response.data.applicationDeadline)
            : null,
          keywords: response.data.keywords?.join(", "),
        });
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      message.error("Không thể tải thông tin job");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const jobData = {
        ...values,
        applicationDeadline: values.applicationDeadline
          ? values.applicationDeadline.toISOString()
          : null,
      };

      let response;
      if (isEdit) {
        response = await updateMyJob(id, jobData);
      } else {
        response = await createMyJob(jobData);
      }

      if (response.success) {
        message.success(
          isEdit ? "Cập nhật job thành công!" : "Đăng tin thành công!"
        );
        navigate("/company/my-jobs");
      } else {
        message.error(response.errors?.[0] || "Đã xảy ra lỗi!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
              {isEdit ? "Cập nhật tin tuyển dụng" : "Tạo tin tuyển dụng mới"}
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">
              {isEdit ? "Chỉnh sửa tin tuyển dụng" : "Đăng tin tuyển dụng mới"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Mô tả rõ ràng vị trí, yêu cầu và quyền lợi để thu hút đúng ứng
              viên tiềm năng.
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              type="default"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
          </div>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="space-y-6"
        >
          <Card
            className="border-0 shadow-xl rounded-2xl bg-white/90 backdrop-blur-sm"
            bodyStyle={{ padding: 24 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Thông tin chung
                </h2>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Tiêu đề"
                  name="title"
                  rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                  <Input
                    placeholder="VD: Tuyển lập trình viên ReactJS"
                    size="large"
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Địa điểm"
                  name="location"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa điểm" },
                  ]}
                >
                  <Input
                    placeholder="Hà Nội, Việt Nam"
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Địa chỉ cụ thể" name="specificAddress">
                  <Input
                    placeholder="Tầng 5, Tòa nhà ABC, ..."
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Mô tả công việc"
                  name="description"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Mô tả chi tiết về công việc"
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <h2 className="mt-2 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Chi tiết tuyển dụng
                </h2>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Loại hình"
                  name="jobType"
                  initialValue="Full-time"
                >
                  <Select className="w-full [&_.ant-select-selector]:rounded-lg [&_.ant-select-selector]:border-slate-200 [&_.ant-select-selector]:bg-slate-50">
                    <Select.Option value="Full-time">Full-time</Select.Option>
                    <Select.Option value="Part-time">Part-time</Select.Option>
                    <Select.Option value="Contract">Contract</Select.Option>
                    <Select.Option value="Internship">Internship</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Mức lương" name="salary">
                  <Input
                    placeholder="10-15 triệu VND"
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Danh mục" name="category">
                  <Input
                    placeholder="IT, Marketing, Sales, ..."
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Cấp độ" name="level" initialValue="Nhân viên">
                  <Input
                    placeholder="Nhân viên, Quản lý, ..."
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Số lượng tuyển"
                  name="hiringQuantity"
                  initialValue={1}
                >
                  <InputNumber
                    min={1}
                    className="w-full rounded-lg border-slate-200 bg-slate-50"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Hạn nộp hồ sơ" name="applicationDeadline">
                  <DatePicker
                    className="w-full rounded-lg border-slate-200 bg-slate-50"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <h2 className="mt-2 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Yêu cầu ứng viên
                </h2>
              </Col>

              <Col span={12}>
                <Form.Item label="Yêu cầu bằng cấp" name="degreeRequirement">
                  <Input
                    placeholder="Đại học, Cao đẳng, ..."
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Yêu cầu kinh nghiệm"
                  name="experienceRequirement"
                >
                  <Input
                    placeholder="1-2 năm, 3-5 năm, ..."
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Yêu cầu giới tính"
                  name="genderRequirement"
                  initialValue="Không yêu cầu"
                >
                  <Select className="w-full [&_.ant-select-selector]:rounded-lg [&_.ant-select-selector]:border-slate-200 [&_.ant-select-selector]:bg-slate-50">
                    <Select.Option value="Không yêu cầu">
                      Không yêu cầu
                    </Select.Option>
                    <Select.Option value="Nam">Nam</Select.Option>
                    <Select.Option value="Nữ">Nữ</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Yêu cầu công việc" name="requirements">
                  <TextArea
                    rows={4}
                    placeholder="- Yêu cầu 1&#10;- Yêu cầu 2&#10;..."
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <h2 className="mt-2 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Quyền lợi & từ khóa
                </h2>
              </Col>

              <Col span={24}>
                <Form.Item label="Quyền lợi" name="benefits">
                  <TextArea
                    rows={4}
                    placeholder="- Lương tháng 13&#10;- Bảo hiểm đầy đủ&#10;..."
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Từ khóa (ngăn cách bởi dấu phẩy)"
                  name="keywords"
                  help="Giúp ứng viên dễ tìm thấy tin của bạn"
                >
                  <Input
                    placeholder="ReactJS, NodeJS, MongoDB, JavaScript"
                    className="rounded-lg border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <div className="mt-4 border-t border-slate-100 pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400">
                    Hãy kiểm tra lại thông tin trước khi{" "}
                    {isEdit ? "cập nhật" : "đăng tin"}.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button onClick={() => navigate("/company/my-jobs")}>
                      Hủy
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="!bg-emerald-500 hover:!bg-emerald-600 !border-none"
                    >
                      {isEdit ? "Cập nhật" : "Đăng tin"}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default MyJobForm;
