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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {isEdit ? "Chỉnh sửa tin tuyển dụng" : "Đăng tin tuyển dụng mới"}
      </h1>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
              >
                <Input placeholder="VD: Tuyển lập trình viên ReactJS" size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Địa điểm"
                name="location"
                rules={[{ required: true, message: "Vui lòng nhập địa điểm" }]}
              >
                <Input placeholder="Hà Nội, Việt Nam" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Địa chỉ cụ thể" name="specificAddress">
                <Input placeholder="Tầng 5, Tòa nhà ABC, ..." />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Mô tả công việc"
                name="description"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <TextArea rows={5} placeholder="Mô tả chi tiết về công việc" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Loại hình" name="jobType" initialValue="Full-time">
                <Select>
                  <Select.Option value="Full-time">Full-time</Select.Option>
                  <Select.Option value="Part-time">Part-time</Select.Option>
                  <Select.Option value="Contract">Contract</Select.Option>
                  <Select.Option value="Internship">Internship</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Mức lương" name="salary">
                <Input placeholder="10-15 triệu VND" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Danh mục" name="category">
                <Input placeholder="IT, Marketing, Sales, ..." />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Cấp độ" name="level" initialValue="Nhân viên">
                <Input placeholder="Nhân viên, Quản lý, ..." />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Số lượng tuyển" name="hiringQuantity" initialValue={1}>
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Hạn nộp hồ sơ" name="applicationDeadline">
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Yêu cầu bằng cấp"
                name="degreeRequirement"
                initialValue="Không yêu cầu"
              >
                <Input placeholder="Đại học, Cao đẳng, ..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Yêu cầu kinh nghiệm"
                name="experienceRequirement"
                initialValue="Không yêu cầu kinh nghiệm"
              >
                <Input placeholder="1-2 năm, 3-5 năm, ..." />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Yêu cầu giới tính"
                name="genderRequirement"
                initialValue="Không yêu cầu"
              >
                <Select>
                  <Select.Option value="Không yêu cầu">Không yêu cầu</Select.Option>
                  <Select.Option value="Nam">Nam</Select.Option>
                  <Select.Option value="Nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Yêu cầu công việc" name="requirements">
                <TextArea rows={4} placeholder="- Yêu cầu 1&#10;- Yêu cầu 2&#10;..." />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Quyền lợi" name="benefits">
                <TextArea
                  rows={4}
                  placeholder="- Lương tháng 13&#10;- Bảo hiểm đầy đủ&#10;..."
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Từ khóa (ngăn cách bởi dấu phẩy)"
                name="keywords"
                help="Giúp ứng viên dễ tìm thấy tin của bạn"
              >
                <Input placeholder="ReactJS, NodeJS, MongoDB, JavaScript" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <div className="flex justify-end gap-2">
                <Button onClick={() => navigate("/company/my-jobs")}>Hủy</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ background: "#52c41a" }}
                >
                  {isEdit ? "Cập nhật" : "Đăng tin"}
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default MyJobForm;
