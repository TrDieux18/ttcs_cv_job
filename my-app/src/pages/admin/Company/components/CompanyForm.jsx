import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Popconfirm,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { createCompany } from "@services/admin/CompanyService";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyById, updateCompany } from "@services/admin/CompanyService";
import { formatDateTime } from "@helpers/formatDate";
import { DeleteOutlined, BuildOutlined } from "@ant-design/icons";
import { getAllUsers } from "@services/admin/UserService";

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

const styleOutermostCard = {
  height: "100%",
  border: "none",
  borderRadius: 0,
};

const styleLabelSpan = {
  fontWeight: 600,
  color: "#d0d0d0",
  fontSize: "14px",
};

const CompanyForm = ({ mode }) => {
  const [form] = Form.useForm();

  const [preview, setPreview] = useState("");
  const [users, setUsers] = useState([]);
  const [companyData, setCompanyData] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = mode === "update";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers({ page: 1, limit: 1000 });
        if (response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      if (isEdit && id) {
        try {
          const response = await getCompanyById(id);
          if (response.data) {
            setCompanyData(response.data);
            form.setFieldsValue({
              ...response.data,
              user: response.data.user?._id || null,
              createdAt: formatDateTime(response.data.createdAt),
              updatedAt: formatDateTime(response.data.updatedAt),
            });
            if (response.data.logo?.url) {
              setPreview(response.data.logo.url);
            }
          }
        } catch (error) {
          console.error("Error fetching company data:", error);
        }
      }
    };
    fetchCompany();
  }, [id, isEdit]);

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append tất cả fields từ form values
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });

    const fileInput = document.getElementById("logoInput");
    if (fileInput?.files?.[0]) {
      formData.append("logo", fileInput.files[0]);
    }

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      if (isEdit) {
        const response = await updateCompany(id, formData);
        if (response.success) {
          message.success("Cập nhật công ty thành công!");
          navigate(-1);
        } else {
          message.error(response.errors?.[0] || "Đã xảy ra lỗi!");
        }
      } else {
        const response = await createCompany(formData);
        if (response.success) {
          message.success("Tạo công ty thành công!");
          navigate(-1);
        } else {
          message.error(response.errors?.[0] || "Đã xảy ra lỗi!");
        }
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Chỉnh sửa công ty" : "Tạo công ty mới"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit
              ? "Cập nhật thông tin công ty trong hệ thống"
              : "Thêm công ty mới vào hệ thống"}
          </p>
        </div>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row
            style={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Col span={10}>
              <Card
                style={styleOutermostCard}
                styles={{
                  body: {
                    padding: 0,
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {preview ? (
                    <Image
                      height={120}
                      width={120}
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
                        width: 120,
                        height: 120,
                        borderRadius: "8px",
                        backgroundColor: "#f0f0f0",
                        color: "#888",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 48,
                        fontWeight: 600,
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
                    style={{
                      ...styleButton,
                      width: "30%",
                      margin: "10px 0 0 5px",
                    }}
                    onClick={() =>
                      document.getElementById("logoInput")?.click()
                    }
                  >
                    {preview ? "Đổi logo" : "Tải logo"}
                  </Button>

                  {isEdit && (
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold">
                        {companyData?.headline || "Công ty"}
                      </h2>
                      <span className="font-medium text-gray-300">
                        User: {companyData?.user?.fullName || "—"}
                      </span>
                    </div>
                  )}
                </div>
                {isEdit && (
                  <>
                    <div className="mt-3 flex items-center gap-2">
                      <h2 className="bg-[#f9f9f9] px-1.5 py-1 rounded-xl border-2 border-[#eee] w-fit">
                        <span className="text-[#000] text-4 font-medium">
                          Company ID:
                        </span>
                        <span className="text-[10px] font-medium text-[#888]">
                          {companyData?._id}
                        </span>
                      </h2>
                      <Button
                        style={{
                          backgroundColor: "#f9f9f9",
                          padding: "6px 8px",
                          border: "2px solid #eee",
                          borderRadius: "16px",
                          color: " #000",
                          fontWeight: 600,
                          fontSize: "12px",
                        }}
                        onClick={() =>
                          navigator.clipboard.writeText(companyData?._id)
                        }
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="mt-4 flex flex-col  items-start">
                      <Popconfirm
                        cancelText="Hủy"
                        okText="Xóa"
                        title="Bạn có chắc chắn xóa công ty này?"
                      >
                        <Button
                          style={{
                            padding: 0,
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#ffffff")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#ffffff")
                          }
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                        >
                          Xóa công ty
                        </Button>
                      </Popconfirm>
                    </div>
                  </>
                )}
              </Card>
            </Col>

            <Col span={14}>
              <Card
                style={styleOutermostCard}
                styles={{
                  body: {
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                  },
                }}
              >
                <Card
                  style={{ border: "2px solid #eee" }}
                  styles={{
                    body: {
                      padding: "10px 15px",
                    },
                  }}
                >
                  <Row gutter={[20, 10]}>
                    <Col
                      span={24}
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      Thông tin công ty
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label={<span style={styleLabelSpan}>User</span>}
                        style={{ margin: 0 }}
                        name="user"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn user.",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Chọn user"
                          showSearch
                          optionFilterProp="children"
                          style={{ height: 39.56, backgroundColor: "#f9f9f9" }}
                        >
                          {users.map((user) => (
                            <Select.Option key={user._id} value={user._id}>
                              <span style={{ fontWeight: 600 }}>
                                {user.fullName} ({user.email})
                              </span>
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label={<span style={styleLabelSpan}>Tiêu đề</span>}
                        style={{ margin: 0 }}
                        name="headline"
                      >
                        <Input placeholder="Nhập tiêu đề" style={styleInput} />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label={<span style={styleLabelSpan}>Mô tả</span>}
                        style={{ margin: 0 }}
                        name="description"
                      >
                        <Input.TextArea
                          placeholder="Nhập mô tả"
                          style={styleInput}
                          rows={4}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        label={<span style={styleLabelSpan}>Website</span>}
                        style={{ margin: 0 }}
                        name="website"
                      >
                        <Input placeholder="https://..." style={styleInput} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        label={<span style={styleLabelSpan}>Địa điểm</span>}
                        style={{ margin: 0 }}
                        name="location"
                      >
                        <Input
                          placeholder="Hanoi, Vietnam"
                          style={styleInput}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label={<span style={styleLabelSpan}>Quy mô</span>}
                        style={{ margin: 0 }}
                        name="size"
                      >
                        <Input placeholder="50-200" style={styleInput} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                {isEdit && (
                  <Card
                    style={{ border: "2px solid #eee", margin: "15px 0" }}
                    styles={{
                      body: {
                        padding: "10px 15px",
                      },
                    }}
                  >
                    <Row gutter={[20, 10]}>
                      <Col
                        span={24}
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                        }}
                      >
                        Khác
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          label={<span style={styleLabelSpan}>Ngày tạo</span>}
                          style={{ margin: 0 }}
                          name="createdAt"
                        >
                          <Input style={styleInput} disabled />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          label={
                            <span style={styleLabelSpan}>
                              Cập nhật gần nhất
                            </span>
                          }
                          style={{ margin: 0 }}
                          name="updatedAt"
                        >
                          <Input style={styleInput} disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                )}
                <div className="flex justify-end">
                  <Button
                    type="primary"
                    size="large"
                    className="min-w-[150px]"
                    htmlType="submit"
                  >
                    {isEdit ? "Cập nhật" : "Tạo mới"}
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default CompanyForm;
