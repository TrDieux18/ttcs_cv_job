import { Button, Card, Col, Form, Image, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { BuildOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getMyCompany } from "@services/company/CompanyService";

import { updateMyCompany } from "@services/company/CompanyService";

const { TextArea } = Input;

const MyCompany = () => {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState(null);
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await getMyCompany();
        if (response.success) {
          setCompanyData(response.data);
          form.setFieldsValue(response.data);
          setPreview(
            response.data.logo?.public_id || response.data.logo?.url || ""
          );
        }
      } catch (error) {
        console.error("Error loading company data:", error);
      }
    };
    fetchCompanyData();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const logoFile = document.getElementById("companyLogo")?.files?.[0];
      const payload = {
        ...values,
        _id: companyData._id,
        logo: logoFile ? logoFile : null,
      };

      const response = await updateMyCompany(payload);

      message.success("Cập nhật công ty thành công!");
      navigate("/company/profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-8 py-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ công ty</h1>
            <p className="mt-1 text-sm text-gray-500">
              Hãy cung cấp thông tin rõ ràng để ứng viên hiểu hơn về doanh
              nghiệp.
            </p>
          </div>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="space-y-6"
        >
          <Card className="shadow-sm border border-gray-200 rounded-lg">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <h2 className="text-lg font-semibold text-gray-800">
                  Thông tin công ty
                </h2>
              </Col>

              <Col span={8}>
                <div className="flex flex-col ">
                  {preview ? (
                    <Image
                      height={160}
                      width={160}
                      src={preview}
                      className="rounded-xl object-cover"
                      preview={false}
                    />
                  ) : (
                    <div className="w-[160px] h-[160px] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-5xl">
                      <BuildOutlined />
                    </div>
                  )}

                  <input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    style={{
                      display: "none",
                    }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setPreview(URL.createObjectURL(file));
                    }}
                  />

                  <Button
                    type="primary"
                    className="!mt-4  hover:!bg-[#16a34a] !border-none !w-[160px] !rounded-lg"
                    onClick={() =>
                      document.getElementById("companyLogo")?.click()
                    }
                  >
                    {preview ? "Đổi logo" : "Tải logo"}
                  </Button>
                </div>
              </Col>

              <Col span={16}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item
                      label="Tiêu đề"
                      name="headline"
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="Global IT Services Company"
                        size="large"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Mô tả" name="description">
                      <TextArea placeholder="Mô tả ngắn về công ty" rows={4} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Website" name="website">
                      <Input placeholder="https://..." />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Địa điểm" name="location">
                      <Input placeholder="Hanoi, Da Nang, Ho Chi Minh" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Quy mô" name="size">
                      <Input placeholder="10, 50-100, 1000+..." />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Loại hình công ty" name="companyModel">
                      <Input placeholder="Công ty Cổ phần, Tập đoàn..." />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Lĩnh vực" name="industry">
                      <Input placeholder="Công nghệ thông tin..." />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Quốc gia" name="country">
                      <Input placeholder="Việt Nam" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Năm thành lập" name="foundedYear">
                      <Input placeholder="1999" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Thời gian làm việc" name="workTime">
                      <Input placeholder="Thứ 2 – Thứ 6" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Giới thiệu công ty" name="about">
                      <TextArea
                        rows={5}
                        placeholder="Giới thiệu chi tiết hơn về công ty..."
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <div className="border-t border-gray-200 pt-4 flex justify-end gap-2">
                  <Button onClick={() => navigate("/company/profile")}>
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                    className=" !border-none !rounded-lg"
                  >
                    Cập nhật
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default MyCompany;
