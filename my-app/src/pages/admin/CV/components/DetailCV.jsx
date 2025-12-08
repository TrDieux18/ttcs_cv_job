import {
  Card,
  Col,
  Row,
  Space,
  Divider,
  Typography,
  Tag,
  message,
  Button,
  Spin,
  Avatar,
  Progress,
  Timeline,
  Descriptions,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  DownloadOutlined,
  UserOutlined,
  TrophyOutlined,
  ProjectOutlined,
  SafetyCertificateOutlined,
  GithubOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCvById } from "@services/client/CvService";

const { Title, Text, Paragraph } = Typography;

const DetailCV = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!_id) return;

    const fetchCvDetails = async () => {
      try {
        setLoading(true);
        const response = await getCvById(_id);
        if (response.success && response.data) {
          setCv(response.data);
        } else {
          message.error(response.message || "Không thể tải CV!");
        }
      } catch (error) {
        console.error("Error fetching CV:", error);
        message.error("Có lỗi xảy ra khi tải CV!");
      } finally {
        setLoading(false);
      }
    };

    fetchCvDetails();
  }, [_id]);

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    if (dateStr === "Hiện tại") return "Hiện tại";

    if (dateStr.includes("T") || dateStr.includes("Z")) {
      return new Date(dateStr).toLocaleDateString("vi-VN");
    }

    if (dateStr.includes("-")) {
      const [day, month, year] = dateStr.split("-");
      if (day && month && year) {
        return `${day}/${month}/${year}`;
      }
    }

    return dateStr;
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
      message.success("Tải CV thành công!");
    } catch (error) {
      message.error("Không thể tải CV!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="text-center py-12">
        <Text type="secondary">Không tìm thấy CV</Text>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-7xl  p-6">
      {}
      <div className="mb-6">
        <Button type="link" onClick={() => navigate(-1)} className="mb-4 px-0">
          ← Quay lại
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <Title level={2} className="mb-2">
              Chi tiết hồ sơ ứng viên
            </Title>
            <Text type="secondary">Thông tin chi tiết về CV của ứng viên</Text>
          </div>
          {cv.fileUrl && (
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="large"
              onClick={() =>
                handleDownload(
                  cv.fileUrl,
                  `CV_${cv.userId?.fullName || "candidate"}.pdf`
                )
              }
            >
              Tải xuống CV
            </Button>
          )}
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {}
        <Col xs={24} lg={8}>
          <Card className="shadow-sm border border-gray-200 rounded-lg">
            <Space direction="vertical" align="center" className="w-full mb-6">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                src={cv.userId?.avatar}
                className="border-4 border-blue-100"
              />
              <div className="text-center">
                <Title level={3} className="mb-1">
                  {cv.userId?.fullName || "N/A"}
                </Title>
                <Text type="secondary" className="text-base">
                  {cv.title}
                </Text>
              </div>
            </Space>

            <Divider className="my-4" />

            <Descriptions column={1} size="small" className="mb-4">
              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2">
                    <MailOutlined className="text-blue-600" />
                    Email
                  </span>
                }
              >
                <Text copyable>{cv.userId?.email || "N/A"}</Text>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2">
                    <PhoneOutlined className="text-green-600" />
                    Số điện thoại
                  </span>
                }
              >
                {cv.userId?.phoneNumber || cv.userId?.phone || "Chưa cập nhật"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2">
                    <CalendarOutlined className="text-orange-600" />
                    Ngày sinh
                  </span>
                }
              >
                {parseDate(cv.userId?.dateOfBirth) || "Chưa cập nhật"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="flex items-center gap-2">
                    <EnvironmentOutlined className="text-red-600" />
                    Địa chỉ
                  </span>
                }
              >
                {cv.userId?.address || "Chưa cập nhật"}
              </Descriptions.Item>

              {cv.userId?.jobTitle && (
                <Descriptions.Item
                  label={
                    <span className="flex items-center gap-2">
                      <UserOutlined className="text-purple-600" />
                      Vị trí hiện tại
                    </span>
                  }
                >
                  <Tag color="purple">{cv.userId.jobTitle}</Tag>
                </Descriptions.Item>
              )}

              {cv.userId?.gender && (
                <Descriptions.Item label="Giới tính">
                  {cv.userId.gender === "male"
                    ? "Nam"
                    : cv.userId.gender === "female"
                    ? "Nữ"
                    : "Khác"}
                </Descriptions.Item>
              )}
            </Descriptions>

            {}
            {cv.userId?.foreignLanguages &&
              cv.userId.foreignLanguages.length > 0 && (
                <>
                  <Divider className="my-4" />
                  <div className="mb-4">
                    <Text strong className="block mb-2">
                      Ngoại ngữ
                    </Text>
                    <Space direction="vertical" size="small" className="w-full">
                      {cv.userId.foreignLanguages.map((lang, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-blue-50 rounded"
                        >
                          <Text>{lang.language}</Text>
                          <Tag color="blue">{lang.level}</Tag>
                        </div>
                      ))}
                    </Space>
                  </div>
                </>
              )}

            {}
            {cv.userId?.introduction && cv.userId.introduction.length > 0 && (
              <>
                <Divider className="my-4" />
                <div className="mb-4">
                  <Text strong className="block mb-2">
                    Giới thiệu
                  </Text>
                  <div className="space-y-1">
                    {cv.userId.introduction.map((intro, index) => (
                      <Tag key={index} color="green">
                        {intro}
                      </Tag>
                    ))}
                  </div>
                </div>
              </>
            )}

            {cv.githubLink && (
              <>
                <Divider className="my-4" />
                <Button
                  type="link"
                  icon={<GithubOutlined />}
                  href={cv.githubLink}
                  target="_blank"
                  className="px-0"
                >
                  Xem Github Profile
                </Button>
              </>
            )}

            {cv.userId?.socialLinks && (
              <>
                <Divider className="my-4" />
                <Button
                  type="link"
                  href={cv.userId.socialLinks}
                  target="_blank"
                  className="px-0"
                >
                  Xem Social Links
                </Button>
              </>
            )}
          </Card>
        </Col>

        {}
        <Col xs={24} lg={16}>
          <Space direction="vertical" size="large" className="w-full">
            {}
            <Card
              className="shadow-sm border border-gray-200 rounded-lg"
              title={
                <div className="flex items-center gap-2">
                  <TrophyOutlined className="text-blue-600" />
                  <span>Kỹ năng</span>
                </div>
              }
            >
              {cv.skills && cv.skills.length > 0 ? (
                <div className="space-y-3">
                  {cv.skills.map((skill, index) => {
                    const skillName =
                      typeof skill === "string" ? skill : skill?.name || "N/A";
                    const experience =
                      typeof skill === "object" ? skill?.experience : null;

                    let level = 50;
                    if (typeof skill === "object" && skill?.level) {
                      level = skill.level;
                    } else if (experience) {
                      const years = parseInt(experience);
                      if (!isNaN(years)) {
                        level = Math.min(years * 20 + 20, 100);
                      } else if (experience.includes("năm")) {
                        const match = experience.match(/(\d+)/);
                        if (match) {
                          const years = parseInt(match[1]);
                          level = Math.min(years * 20 + 20, 100);
                        }
                      }
                    }

                    return (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Text strong className="text-base">
                            {skillName}
                          </Text>
                          {experience && <Tag color="blue">{experience}</Tag>}
                        </div>
                        <Progress
                          percent={level}
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#87d068",
                          }}
                          size="small"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Text type="secondary">Chưa có thông tin kỹ năng</Text>
              )}
            </Card>

            {}
            <Card
              className="shadow-sm border border-gray-200 rounded-lg"
              title={
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-green-600" />
                  <span>Kinh nghiệm làm việc</span>
                </div>
              }
            >
              {cv.experience && cv.experience.length > 0 ? (
                <Timeline
                  items={cv.experience.map((exp, i) => ({
                    color: "blue",
                    children: (
                      <div key={i} className="pb-4">
                        <Title level={5} className="mb-1">
                          {exp.position}
                        </Title>
                        <Text strong className="text-blue-600 block mb-1">
                          {exp.company}
                        </Text>
                        <div className="mt-2 mb-2">
                          <Text type="secondary">
                            <CalendarOutlined className="mr-2" />
                            {parseDate(exp.from)} - {parseDate(exp.to)}
                          </Text>
                        </div>
                        {exp.description && (
                          <Paragraph className="mb-2 text-gray-600">
                            <Text strong>Mô tả: </Text>
                            {exp.description}
                          </Paragraph>
                        )}
                        {exp.project && (
                          <Paragraph className="mb-0 text-gray-600">
                            <Text strong>Dự án: </Text>
                            {exp.project}
                          </Paragraph>
                        )}
                      </div>
                    ),
                  }))}
                />
              ) : (
                <Text type="secondary">Chưa có kinh nghiệm làm việc</Text>
              )}
            </Card>

            {}
            <Card
              className="shadow-sm border border-gray-200 rounded-lg"
              title={
                <div className="flex items-center gap-2">
                  <SafetyCertificateOutlined className="text-purple-600" />
                  <span>Học vấn</span>
                </div>
              }
            >
              {cv.education && cv.education.length > 0 ? (
                <Timeline
                  items={cv.education.map((edu, i) => ({
                    color: "green",
                    children: (
                      <div key={i} className="pb-4">
                        <Title level={5} className="mb-1">
                          {edu.degree}
                        </Title>
                        <Text strong className="text-green-600 block mb-1">
                          {edu.school}
                        </Text>
                        <div className="mt-2">
                          <Text type="secondary">
                            <CalendarOutlined className="mr-2" />
                            {parseDate(edu.from)} - {parseDate(edu.to)}
                          </Text>
                        </div>
                        {edu.description && (
                          <Paragraph className="mb-0 mt-2 text-gray-600">
                            {edu.description}
                          </Paragraph>
                        )}
                      </div>
                    ),
                  }))}
                />
              ) : (
                <Text type="secondary">Chưa có thông tin học vấn</Text>
              )}
            </Card>

            {}
            {cv.projects && cv.projects.length > 0 && (
              <Card
                className="shadow-sm border border-gray-200 rounded-lg"
                title={
                  <div className="flex items-center gap-2">
                    <ProjectOutlined className="text-orange-600" />
                    <span>Dự án</span>
                  </div>
                }
              >
                <Space direction="vertical" className="w-full" size="large">
                  {cv.projects.map((project, i) => (
                    <div key={i} className="border-l-4 border-orange-400 pl-4">
                      <Title level={5} className="mb-1">
                        {project.name}
                      </Title>
                      <Text type="secondary" className="block mb-2">
                        {project.role}
                      </Text>
                      {project.description && (
                        <Paragraph className="mb-2 text-gray-600">
                          {project.description}
                        </Paragraph>
                      )}
                      {project.link && (
                        <Button
                          type="link"
                          href={project.link}
                          target="_blank"
                          className="px-0"
                        >
                          Xem dự án →
                        </Button>
                      )}
                    </div>
                  ))}
                </Space>
              </Card>
            )}

            {}
            {cv.certificates && cv.certificates.length > 0 && (
              <Card
                className="shadow-sm border border-gray-200 rounded-lg"
                title={
                  <div className="flex items-center gap-2">
                    <TrophyOutlined className="text-yellow-600" />
                    <span>Chứng chỉ</span>
                  </div>
                }
              >
                <Space direction="vertical" className="w-full" size="middle">
                  {cv.certificates.map((cert, i) => (
                    <div key={i} className="p-3 bg-yellow-50 rounded-lg">
                      <Text strong className="block mb-1">
                        {cert.name}
                      </Text>
                      <Text type="secondary" className="block mb-1">
                        {cert.organization}
                      </Text>
                      {cert.date && (
                        <Text type="secondary" className="text-sm">
                          <CalendarOutlined className="mr-1" />
                          {new Date(cert.date).toLocaleDateString("vi-VN")}
                        </Text>
                      )}
                    </div>
                  ))}
                </Space>
              </Card>
            )}

            {}
            {cv.awards && cv.awards.length > 0 && (
              <Card
                className="shadow-sm border border-gray-200 rounded-lg"
                title={
                  <div className="flex items-center gap-2">
                    <TrophyOutlined className="text-red-600" />
                    <span>Giải thưởng</span>
                  </div>
                }
              >
                <Space direction="vertical" className="w-full" size="middle">
                  {cv.awards.map((award, i) => (
                    <div key={i} className="p-3 bg-red-50 rounded-lg">
                      <Text strong className="block mb-1">
                        {award.name}
                      </Text>
                      <Text type="secondary" className="block mb-1">
                        {award.organization}
                      </Text>
                      {award.date && (
                        <Text type="secondary" className="text-sm">
                          <CalendarOutlined className="mr-1" />
                          {new Date(award.date).toLocaleDateString("vi-VN")}
                        </Text>
                      )}
                    </div>
                  ))}
                </Space>
              </Card>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default DetailCV;
