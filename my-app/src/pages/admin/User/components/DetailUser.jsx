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
import { getAllRoles } from "@services/admin/RoleService";
import { BASE_API } from "@types/api";
import { useParams } from "react-router-dom";
import { getUserById } from "@services/admin/UserService";
import { formatDateTime } from "@helpers/formatDate";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

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

const DetailUser = () => {
  const [form] = Form.useForm();

  const [preview, setPreview] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [userData, setUserData] = useState(null);

  const [initialAvatar, setInitialAvatar] = useState("");
  const [signInTime, setSignInTime] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getAllRoles();
        if (response.success) {
          setRoles(response.data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await getUserById(id);
          if (response) {
            setUserData(response);
            form.setFieldsValue({
              ...response,
              role_id: response.role_id?._id || null,
              createdAt: formatDateTime(response.createdAt),
              updatedAt: formatDateTime(response.updatedAt),
            });
            setSignInTime(formatDateTime(response.timeLogin));
            setEmail(response.email);
            if (response.avatar && response.avatar.length > 1) {
              setPreview(`${BASE_API}${response.avatar}`);
            } else {
              const words = response.fullName.trim().split(" ");
              const initials = words[words.length - 1][0].toUpperCase();
              setInitialAvatar(initials);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, [id]);
  console.log(preview);

  return (
    <div className="overflow-x-auto space-y-4 p-2">
      <Form layout="vertical" form={form}>
        <Row
          style={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Col span={10}>
            <Card style={styleOutermostCard}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {preview ? (
                  <Image
                    src={preview}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    preview={false}
                  />
                ) : (
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: "#041527",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      fontWeight: 600,
                    }}
                  >
                    {initialAvatar}
                  </div>
                )}
                <input
                  type="file"
                  id="avatarInput"
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

                <div className="mt-4">
                  <h2 className="text-xl font-semibold">{email}</h2>
                  <span className="font-semibold text-[#d0d0d0]">
                    Đăng nhập gần nhất: {signInTime}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <h2 className="bg-[#f9f9f9] px-1.5 py-1 rounded-xl border-2 border-[#eee] w-fit">
                  <span className="text-[#000] text-4 font-medium">
                    User ID:
                  </span>
                  <span className="text-[10px] font-medium text-[#888]">
                    {userData?._id}
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
                >
                  Copy
                </Button>
              </div>
              <div className="mt-7 flex flex-col  items-start">
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
                  type="text"
                  icon={<UserOutlined />}
                >
                  Hồ sơ cá nhân
                </Button>

                <Popconfirm
                  cancelText="Hủy"
                  okText="Xóa"
                  title="Bạn có chắc chắn xóa người dùng này?"
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
                    Xóa người dùng
                  </Button>
                </Popconfirm>
              </div>
            </Card>
          </Col>

          <Col span={14}>
            <Card
              style={styleOutermostCard}
              styles={{
                body: {
                  display: "flex",
                  flexDirection: "column",
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
                    Thông tin cá nhân
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span style={styleLabelSpan}>Họ và tên</span>}
                      style={{ margin: 0 }}
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ và tên.",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập họ và tên"
                        style={styleInput}
                        onChange={(e) => {
                          const fullName = e.target.value;
                          const words = fullName.trim().split(" ");
                          const intials =
                            words[words.length - 1][0].toUpperCase();
                          setInitialAvatar(intials);
                        }}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span style={styleLabelSpan}>Tên tài khoản</span>}
                      style={{ margin: 0 }}
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên tài khoản.",
                        },
                      ]}
                      disabled
                    >
                      <Input
                        placeholder="Nhập tên tài khoản"
                        style={styleInput}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label={
                        <span style={styleLabelSpan}>Tài khoản email</span>
                      }
                      style={{ margin: 0 }}
                      name="email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email," },
                        { type: "email", message: "Email không hợp lệ." },
                      ]}
                    >
                      <Input
                        placeholder="Nhập email"
                        style={styleInput}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={<span style={styleLabelSpan}>Mật khẩu</span>}
                      style={{ margin: 0 }}
                      name="password"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu." },
                      ]}
                      disabled
                    >
                      <Input.Password
                        placeholder="Nhập mật khẩu"
                        style={styleInput}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span style={styleLabelSpan}>Trạng thái</span>}
                      style={{ margin: 0 }}
                      name="isActive"
                      initialValue={true}
                    >
                      <Select
                        style={{ height: 39.56, backgroundColor: "#f9f9f9" }}
                        disabled
                      >
                        <Select.Option value={true}>
                          <span
                            style={{
                              color: "green",
                              fontWeight: 600,
                            }}
                          >
                            ● Hoạt động
                          </span>
                        </Select.Option>
                        <Select.Option value={false}>
                          <span
                            style={{
                              color: "red",
                              fontWeight: 600,
                            }}
                          >
                            ● Ngừng hoạt động
                          </span>
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={<span style={styleLabelSpan}>Vai trò</span>}
                      style={{ margin: 0 }}
                      name="role_id"
                    >
                      <Select
                        placeholder="Chọn vai trò"
                        optionLabelProp="label"
                        style={{ height: 39.56, backgroundColor: "#f9f9f9" }}
                        disabled
                      >
                        {roles.map((role) => {
                          return (
                            <Select.Option
                              key={role._id}
                              value={role._id}
                              label={
                                <span style={{ fontWeight: 600 }}>
                                  {role.title}
                                </span>
                              }
                            >
                              <span style={{ fontWeight: 600 }}>
                                {role.title}
                              </span>
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

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
                      label={<span style={styleLabelSpan}>Ngày sửa</span>}
                      style={{ margin: 0 }}
                      name="updatedAt"
                    >
                      <Input style={styleInput} disabled />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DetailUser;
