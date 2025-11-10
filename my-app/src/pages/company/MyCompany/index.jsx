import { Button, Card, Col, Form, Image, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuildOutlined } from "@ant-design/icons";
import {
  getMyCompany,
  createMyCompany,
  updateMyCompany,
} from "@services/company/CompanyService";

const styleButton = {
  border: "none",
  padding: "8px 10px",
  backgroundColor: "#3875F6",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
};

const styleInput = {
  border: "none",
  padding: "8px 10px",
  backgroundColor: "#f9f9f9",
  color: "#000",
  fontSize: "15px",
  fontWeight: "600",
};

const styleLabelSpan = {
  fontWeight: 600,
  color: "#d0d0d0",
  fontSize: "14px",
};

const MyCompany = () => {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasCompany, setHasCompany] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCompany();
  }, []);

  const fetchMyCompany = async () => {
    try {
      setLoading(true);
      const response = await getMyCompany();
      if (response.success && response.data) {
        setCompanyData(response.data);
        setHasCompany(true);
        form.setFieldsValue({
          headline: response.data.headline,
          description: response.data.description,
          website: response.data.website,
          location: response.data.location,
          size: response.data.size,
        });
        if (response.data.logo?.url) {
          setPreview(response.data.logo.url);
        }
      }
    } catch (error) {
      console.error("Error fetching company:", error);
      setHasCompany(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });

    const fileInput = document.getElementById("logoInput");
    if (fileInput?.files?.[0]) {
      formData.append("logo", fileInput.files[0]);
    }

    try {
      let response;
      if (hasCompany) {
        response = await updateMyCompany(formData);
      } else {
        response = await createMyCompany(formData);
      }

      if (response.success) {
        message.success(
          hasCompany
            ? "Cập nhật công ty thành công!"
            : "Tạo công ty thành công!"
        );
        fetchMyCompany();
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
        {hasCompany ? "Thông tin công ty của bạn" : "Tạo công ty mới"}
      </h1>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col span={8}>
            <Card>
              <div className="flex flex-col items-center">
                {preview ? (
                  <Image
                    height={150}
                    width={150}
                    src={preview}
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                    preview={false}
                  />
                ) : (
                  <div
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: "8px",
                      backgroundColor: "#f0f0f0",
                      color: "#888",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 48,
                    }}
                  >
                    <BuildOutlined />
                  </div>
                )}
                <input
                  type="file"
                  id="logoInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);
                    }
                  }}
                />
                <Button
                  type="primary"
                  style={{ ...styleButton, marginTop: 16 }}
                  onClick={() => document.getElementById("logoInput")?.click()}
                >
                  {preview ? "Đổi logo" : "Tải logo"}
                </Button>
              </div>
            </Card>
          </Col>

          <Col span={16}>
            <Card>
              <Row gutter={[20, 10]}>
                <Col span={24}>
                  <Form.Item
                    label={<span style={styleLabelSpan}>Tiêu đề</span>}
                    name="headline"
                  >
                    <Input placeholder="Nhập tiêu đề công ty" style={styleInput} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label={<span style={styleLabelSpan}>Mô tả</span>}
                    name="description"
                  >
                    <Input.TextArea
                      placeholder="Mô tả về công ty"
                      style={styleInput}
                      rows={4}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={<span style={styleLabelSpan}>Website</span>}
                    name="website"
                  >
                    <Input placeholder="https://..." style={styleInput} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={<span style={styleLabelSpan}>Địa điểm</span>}
                    name="location"
                  >
                    <Input placeholder="Hanoi, Vietnam" style={styleInput} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label={<span style={styleLabelSpan}>Quy mô</span>}
                    name="size"
                  >
                    <Input placeholder="50-200" style={styleInput} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <div className="flex justify-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={styleButton}
                      loading={loading}
                    >
                      {hasCompany ? "Cập nhật" : "Tạo mới"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MyCompany;
