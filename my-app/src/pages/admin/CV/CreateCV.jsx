import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  message,
  Row,
  Space,
} from "antd";
import { useSelector } from "react-redux";

import { useRef, useState } from "react";

import { MdMailOutline, MdOutlineCake, MdOutlinePhone } from "react-icons/md";

import { LuFileUser } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { createCv } from "@services/client/CvService";

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
  color: "#d0d0d0",
};

const styleLabelSpan = {
  fontWeight: 600,
  color: "#d0d0d0",
  fontSize: "14px",
};

export const CreateCV = () => {
  const user = useSelector((state) => state.user.user);

  const inputRef = useRef();
  const [fileName, setFileName] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setTimestamp(new Date().toLocaleString("vi-VN"));
      setSelectedFile(file);
    }
  };

  const [form] = Form.useForm();

  const createCVHandler = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("userId", user._id);
    formData.append("skills", values.skills);

    if (selectedFile) {
      formData.append("fileUrl", selectedFile);
    }

    formData.append("experience", JSON.stringify(values.experience || []));
    formData.append("education", JSON.stringify(values.education || []));

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await createCv(formData);
      console.log("Create CV Response:", response);
      if (response.success) {
        message.success("Tạo CV thành công!");
      } else {
        message.error("Tạo CV thất bại!");
      }
    } catch (error) {
      console.error("Create CV failed:", error);
      message.error("Tạo CV thất bại!");
    }
  };

  return (
    <div className="overflow-x-auto space-y-4 ">
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
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <Space direction="">
              <Image
                height={80}
                width={80}
                src={user?.avatar}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <Space direction="vertical">
                <h2 className="text-3xl font-semibold text-[#000]">
                  {user?.fullName}
                </h2>
                <h2 className="text-xl font-semibold ">Cập nhật chức danh</h2>
              </Space>
            </Space>
            <Space direction="vertical" style={{ marginTop: 10 }}>
              <div className="flex items-center gap-2 font-medium text-[#000] text-[15px]">
                <MdMailOutline />

                <p>{user.email}</p>
              </div>

              <div className="flex items-center gap-2 font-medium  text-[15px]">
                <MdOutlinePhone />

                <p>Số điện thoại của bạn</p>
              </div>
              <div className="flex items-center gap-2 font-medium  text-[15px]">
                <MdOutlineCake />
                Ngày sinh của bạn
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={14}>
          <Card
            style={styleOutermostCard}
            styles={{
              body: {
                padding: 0,
              },
            }}
          >
            <Form layout="vertical" form={form} onFinish={createCVHandler}>
              <Card
                style={{ border: "2px solid #eee" }}
                styles={{
                  body: {
                    padding: "10px 15px",
                  },
                }}
              >
                <Row gutter={[20, 10]}>
                  <Col span={24}>
                    <Form.Item
                      label={<span style={styleLabelSpan}>Chức danh</span>}
                      name="title"
                      style={{ margin: 0 }}
                      required={true}
                    >
                      <Input style={styleInput} placeholder="FE Developer" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={<span style={styleLabelSpan}>Hồ sơ của bạn</span>}
                      name="fileUrl"
                      style={{ margin: 0 }}
                    >
                      <Space
                        style={{
                          width: "100%",
                          fontWeight: 600,

                          borderBottom: "1px dashed #eee",
                          paddingBottom: 10,
                          cursor: "pointer",
                        }}
                      >
                        <LuFileUser color={"red"} size={40} />
                        <input
                          ref={inputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          style={{
                            border: "none",
                            display: "none",
                          }}
                          onChange={handleFileChange}
                        />
                        {fileName ? (
                          <Space direction="vertical" size={"5px"}>
                            <span>{fileName}</span>
                            <span className="text-[#d0d0d0]">
                              Cập nhật gần nhất: {timestamp}
                            </span>
                          </Space>
                        ) : (
                          <span className="text-xl text-[#d0d0d0]">
                            Chưa có tệp nào được chọn
                          </span>
                        )}
                      </Space>
                    </Form.Item>
                    <Button
                      danger
                      style={{ marginTop: 10, fontWeight: 600, fontSize: 16 }}
                      icon={<FiUpload />}
                      onClick={handleUploadClick}
                    >
                      Tải hồ sơ
                    </Button>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={<span style={styleLabelSpan}>Kĩ năng</span>}
                      style={{ margin: 0 }}
                      name="skills"
                    >
                      <Input
                        style={styleInput}
                        placeholder="Nhập kĩ năng của bạn, cách nhau bằng dấu phẩy (Ví dụ: HTML, CSS, JavaScript)"
                      />
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
                <Col span={24}>
                  <span
                    style={{
                      ...styleLabelSpan,
                      marginBottom: 8,
                      display: "block",
                    }}
                  >
                    Kinh nghiệm làm việc
                  </span>
                  <Form.List name="experience">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Card
                            key={key}
                            style={{
                              marginBottom: 10,
                              background: "#f9f9f9",
                            }}
                            size="small"
                            title={`${name + 1}`}
                            extra={
                              <MinusCircleOutlined
                                style={{ color: "red" }}
                                onClick={() => remove(name)}
                              />
                            }
                          >
                            <Row gutter={10}>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "company"]}
                                  label={
                                    <span style={styleLabelSpan}>Công ty</span>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message: "Nhập tên công ty",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="VD: ABC Corp"
                                    style={{
                                      ...styleInput,
                                      background: "#fff",
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "position"]}
                                  label={
                                    <span style={styleLabelSpan}>
                                      Vị trí công việc
                                    </span>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message: "Nhập vị trí công việc",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="VD: Frontend Dev"
                                    style={{
                                      ...styleInput,
                                      background: "#fff",
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row gutter={10}>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "from"]}
                                  label={<span style={styleLabelSpan}>Từ</span>}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Chọn thời gian bắt đầu",
                                    },
                                  ]}
                                >
                                  <DatePicker
                                    picker="month"
                                    style={{
                                      width: "100%",
                                      ...styleInput,
                                      background: "#fff",
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "to"]}
                                  label={
                                    <span style={styleLabelSpan}>Đến</span>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message: "Chọn thời gian kết thúc",
                                    },
                                  ]}
                                >
                                  <DatePicker
                                    picker="month"
                                    style={{
                                      width: "100%",
                                      ...styleInput,
                                      background: "#fff",
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Card>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            style={{ fontWeight: 600 }}
                          >
                            Thêm kinh nghiệm
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Card>
              <Card
                style={{ border: "2px solid #eee" }}
                styles={{
                  body: {
                    padding: "10px 15px",
                  },
                }}
              >
                <Col span={24}>
                  <span
                    style={{
                      ...styleLabelSpan,
                      marginBottom: 8,
                      display: "block",
                    }}
                  >
                    Học vấn
                  </span>
                  <Form.List name="education">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Card
                            key={key}
                            style={{
                              marginBottom: 10,
                              background: "#f9f9f9",
                            }}
                            size="small"
                            title={`${name + 1}`}
                            extra={
                              <MinusCircleOutlined
                                style={{ color: "red" }}
                                onClick={() => remove(name)}
                              />
                            }
                          >
                            <Row gutter={10}>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "school"]}
                                  label={
                                    <span style={styleLabelSpan}>
                                      Trường học
                                    </span>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message: "Nhập tên công ty",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="VD: Trường ABC"
                                    style={{
                                      ...styleInput,
                                      background: "#fff",
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "degree"]}
                                  label={
                                    <span style={styleLabelSpan}>Bằng cấp</span>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message: "Nhập bằng cấp",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="VD: Cử nhân CNTT"
                                    style={{
                                      ...styleInput,
                                      background: "#fff",
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row gutter={10}>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "from"]}
                                  label={<span style={styleLabelSpan}>Từ</span>}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Chọn thời gian bắt đầu",
                                    },
                                  ]}
                                >
                                  <DatePicker
                                    picker="year"
                                    style={{
                                      width: "100%",
                                      ...styleInput,
                                      background: "#fff",
                                    }}
                                    placeholder="VD: 2021"
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "to"]}
                                  label={
                                    <span style={styleLabelSpan}>Đến</span>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message: "Chọn thời gian kết thúc",
                                    },
                                  ]}
                                >
                                  <DatePicker
                                    picker="year"
                                    style={{
                                      width: "100%",
                                      ...styleInput,
                                      background: "#fff",
                                    }}
                                    placeholder="VD: 2023"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Card>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            style={{ fontWeight: 600 }}
                          >
                            Thêm học vấn
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Card>
              <div className="flex justify-end mt-[15px]">
                <Button style={styleButton} type="primary" htmlType="submit">
                  Tạo CV
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCV;
