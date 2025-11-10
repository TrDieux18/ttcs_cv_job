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
  createJobAdmin,
  updateJobAdmin,
  getJobByIdAdmin,
} from "@services/admin/JobService";
import { getAllCompanies } from "@services/admin/CompanyService";
import { formatDateTime } from "@helpers/formatDate";
import dayjs from "dayjs";

const { TextArea } = Input;

const styleButton = {
  backgroundColor: "#3875F6",
  color: "#fff",
  fontWeight: "600",
};

const JobForm = ({ mode }) => {
  const [form] = Form.useForm();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "update";

  useEffect(() => {
    fetchCompanies();
    if (isEdit && id) {
      fetchJob();
    }
  }, [id, isEdit]);

  const fetchCompanies = async () => {
    try {
      const response = await getAllCompanies({ page: 1, limit: 1000 });
      if (response.data) {
        setCompanies(response.data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await getJobByIdAdmin(id);
      if (response.data) {
        form.setFieldsValue({
          ...response.data,
          company: response.data.company?._id,
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
        response = await updateJobAdmin(id, jobData);
      } else {
        response = await createJobAdmin(jobData);
      }

      if (response.success) {
        message.success(
          isEdit ? "Cập nhật job thành công!" : "Tạo job thành công!"
        );
        navigate("/admin/jobs");
      } else {
        message.error(response.errors?.[0] || "Đã xảy ra lỗi!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        {isEdit ? "Chỉnh sửa công việc" : "Tạo công việc mới"}
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
                <Input placeholder="Nhập tiêu đề công việc" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Công ty"
                name="company"
                rules={[{ required: true, message: "Vui lòng chọn công ty" }]}
              >
                <Select placeholder="Chọn công ty" showSearch optionFilterProp="children">
                  {companies.map((company) => (
                    <Select.Option key={company._id} value={company._id}>
                      {company.headline}
                    </Select.Option>
                  ))}
                </Select>
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

            <Col span={24}>
              <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="Mô tả công việc" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Loại hình" name="jobType">
                <Select placeholder="Chọn loại hình">
                  <Select.Option value="Full-time">Full-time</Select.Option>
                  <Select.Option value="Part-time">Part-time</Select.Option>
                  <Select.Option value="Contract">Contract</Select.Option>
                  <Select.Option value="Internship">Internship</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Lương" name="salary">
                <Input placeholder="10-15 triệu VND" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Danh mục" name="category">
                <Input placeholder="IT, Marketing, ..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Cấp độ" name="level">
                <Input placeholder="Nhân viên, Quản lý, ..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Số lượng tuyển" name="hiringQuantity">
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Yêu cầu bằng cấp" name="degreeRequirement">
                <Input placeholder="Đại học, Cao đẳng, ..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Yêu cầu kinh nghiệm" name="experienceRequirement">
                <Input placeholder="1-2 năm, ..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Yêu cầu giới tính" name="genderRequirement">
                <Select placeholder="Chọn">
                  <Select.Option value="Không yêu cầu">Không yêu cầu</Select.Option>
                  <Select.Option value="Nam">Nam</Select.Option>
                  <Select.Option value="Nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Hạn nộp hồ sơ" name="applicationDeadline">
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Yêu cầu công việc" name="requirements">
                <TextArea rows={3} placeholder="Yêu cầu chi tiết" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Quyền lợi" name="benefits">
                <TextArea rows={3} placeholder="Quyền lợi được hưởng" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Địa chỉ cụ thể" name="specificAddress">
                <Input placeholder="Địa chỉ chi tiết" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Từ khóa (ngăn cách bởi dấu phẩy)" name="keywords">
                <Input placeholder="ReactJS, NodeJS, MongoDB" />
              </Form.Item>
            </Col>

            {isEdit && (
              <Col span={12}>
                <Form.Item label="Nổi bật" name="isFeatured" valuePropName="checked">
                  <Select>
                    <Select.Option value={true}>Có</Select.Option>
                    <Select.Option value={false}>Không</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            )}

            <Col span={24}>
              <div className="flex justify-end gap-2">
                <Button onClick={() => navigate("/admin/jobs")}>Hủy</Button>
                <Button type="primary" htmlType="submit" style={styleButton} loading={loading}>
                  {isEdit ? "Cập nhật" : "Tạo mới"}
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default JobForm;
