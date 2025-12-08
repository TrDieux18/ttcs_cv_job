import { useEffect, useState } from "react";
import { getAllCvs } from "@services/admin/CvService";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Col, Divider, Image, Row, Space } from "antd";
import { formatName } from "@helpers/formatName";
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const CV = () => {
  const [cvs, setCvs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const res = await getAllCvs();
        setCvs(res.data || []);
      } catch (err) {
        console.error("Error fetching CVs:", err);
      }
    };
    fetchCvs();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/admin/cvs/detail/${id}`);
  };

  const SocialButton = ({ icon, bg }) => (
    <Button
      type="text"
      icon={icon}
      style={{
        backgroundColor: bg,
        color: "white",
        fontSize: 18,
        width: 40,
        height: 40,
        borderRadius: "50%",
      }}
    />
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-full">
        {}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý hồ sơ ứng viên
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Danh sách CV của các ứng viên trong hệ thống
            </p>
          </div>
        </div>

        {}
        <Row gutter={[24, 24]}>
          {cvs.map((cv) => (
            <Col key={cv._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => handleCardClick(cv._id)}
                className="shadow-sm rounded-lg transition hover:shadow-lg"
                styles={{ body: { padding: "20px" } }}
              >
                <Space direction="vertical" align="center" className="w-full">
                  <Image
                    src={cv?.userId?.avatar || "/default-avatar.png"}
                    width={100}
                    height={100}
                    preview={false}
                    alt="Avatar"
                    className="rounded-full object-cover border-4 border-blue-100"
                  />

                  <span className="text-lg font-bold text-gray-900">
                    {formatName(cv?.userId?.fullName)}
                  </span>

                  <span className="text-gray-600 text-sm">
                    {cv.title || "Chưa cập nhật tiêu đề"}
                  </span>
                </Space>

                <Space
                  direction="vertical"
                  align="center"
                  className="w-full mt-4"
                >
                  <span className="text-sm font-semibold text-gray-700">
                    Kỹ năng
                  </span>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {cv.skills?.length ? (
                      <>
                        {cv.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium"
                          >
                            {typeof skill === "string"
                              ? skill
                              : skill?.name || "N/A"}
                          </span>
                        ))}
                        {cv.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                            +{cv.skills.length - 3}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">
                        Chưa cập nhật
                      </span>
                    )}
                  </div>
                </Space>

                <Space
                  size="middle"
                  className="w-full flex justify-center mt-4"
                >
                  <SocialButton icon={<LinkedinOutlined />} bg="#0A66C2" />
                  <SocialButton icon={<GithubOutlined />} bg="#24292e" />
                  <SocialButton icon={<TwitterOutlined />} bg="#1DA1F2" />
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CV;
