import {
  Card,
  Col,
  Image,
  Row,
  Space,
  Divider,
  Typography,
  Tag,
  message,
} from "antd";
import { MdMailOutline, MdOutlineCake, MdOutlinePhone } from "react-icons/md";
import { LuFileUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCvById } from "@services/client/CvService";

const { Title, Text } = Typography;

const styleOutermostCard = {
  height: "100%",
  border: "none",
  borderRadius: 0,
  color: "#d0d0d0",
  background: "#fff",
};

const DetailCV = () => {
  const { _id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [cv, setCv] = useState(null);

  useEffect(() => {
    if (!_id) return;

    const fetchCvDetails = async () => {
      try {
        const response = await getCvById(_id);
        if (response.success && response.data) {
          setCv(response.data);
        } else {
          message.error(response.message || "Không thể tải CV!");
        }
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };

    fetchCvDetails();
  }, [_id]);
  console.log("CV Data:", cv);
  const handleDownload = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (!cv) return <p>Đang tải CV...</p>;

  return (
    <div className="overflow-x-auto space-y-4">
      <Row gutter={20}>
        <Col span={7}>
          <Card style={styleOutermostCard}>
            <Space direction="vertical" align="center" className="w-full">
              <Image
                height={100}
                width={100}
                src={user?.avatar}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />

              <Title level={3} style={{ marginBottom: 0 }}>
                {user?.fullName}
              </Title>
              <Text type="secondary" style={{ fontSize: 16 }}>
                {cv.title}
              </Text>
            </Space>

            <Divider />

            <Space direction="vertical" size={12}>
              <div className="flex items-center gap-2 text-[15px]">
                <MdMailOutline />
                <Text>{user.email}</Text>
              </div>

              <div className="flex items-center gap-2 text-[15px]">
                <MdOutlinePhone />
                <Text>Số điện thoại</Text>
              </div>

              <div className="flex items-center gap-2 text-[15px]">
                <MdOutlineCake />
                <Text>Ngày sinh </Text>
              </div>
            </Space>

            <Divider />

            <div className="flex items-center gap-3 text-[15px]">
              <LuFileUser color="#1677ff" size={24} />

              <button
                onClick={() =>
                  handleDownload(
                    cv.fileUrl,
                    `${cv.userId.fullName || "cv"}.pdf`
                  )
                }
                className="text-blue-600 font-medium"
              >
                Tải về
              </button>
            </div>
          </Card>
        </Col>

        <Col span={16}>
          <Card style={styleOutermostCard}>
            <Title level={4}>Kĩ năng</Title>
            {cv.skills && cv.skills.length > 0 ? (
              <Space wrap>
                {cv.skills.map((skill, index) => (
                  <Tag key={index} color="blue">
                    {typeof skill === "string" ? skill : skill?.name || "N/A"}
                    {typeof skill === "object" &&
                      skill?.experience &&
                      ` (${skill.experience})`}
                  </Tag>
                ))}
              </Space>
            ) : (
              <Text type="secondary">Chưa cập nhật</Text>
            )}

            <Divider />

            <Title level={4}>Kinh nghiệm làm việc</Title>
            {cv.experience && cv.experience.length > 0 ? (
              cv.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                  <Text strong>{exp.company}</Text>
                  <p>{exp.position}</p>
                  <Text type="secondary">
                    {new Date(exp.from).toLocaleDateString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })}{" "}
                    →{" "}
                    {new Date(exp.to).toLocaleDateString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })}
                  </Text>
                </div>
              ))
            ) : (
              <Text type="secondary">Chưa có kinh nghiệm</Text>
            )}

            <Divider />

            <Title level={4}>Học vấn</Title>
            {cv.education && cv.education.length > 0 ? (
              cv.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                  <Text strong>{edu.school}</Text>
                  <p>{edu.degree}</p>
                  <Text type="secondary">
                    {new Date(edu.from).toLocaleDateString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })}{" "}
                    →{" "}
                    {new Date(edu.to).toLocaleDateString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })}
                  </Text>
                </div>
              ))
            ) : (
              <Text type="secondary">Chưa có thông tin học vấn</Text>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailCV;
