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
    <div className="overflow-x-auto space-y-4 p-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Danh sách hồ sơ ứng viên</h1>

        <Button type="primary" style={{ background: "#3875F6" }}>
          <NavLink to="/admin/cvs/create">Tạo mới</NavLink>
        </Button>
      </div>

      <Row gutter={[10, 16]}>
        {cvs.map((cv) => (
          <Col key={cv._id} span={6}>
            <Card
              onClick={() => handleCardClick(cv._id)}
              style={{ border: "2px solid #eee", cursor: "pointer" }}
              styles={{ body: { padding: "8px 12px" } }}
            >
          
              <Space direction="vertical" align="center" className="w-full">
                <Image
                  src={cv?.userId?.avatar || "/default-avatar.png"}
                  width={80}
                  height={80}
                  preview={false}
                  alt="Avatar"
                  style={{
                    borderRadius: "55%",
                    background: "#3875F6",
                    objectFit: "cover",
                  }}
                />

                <span className="text-xl font-semibold">
                  {formatName(cv?.userId?.fullName)}
                </span>

                <span className="text-gray-500 text-sm font-semibold">
                  {cv.title || "Chưa cập nhật tiêu đề"}
                </span>
              </Space>

             
              <Space
                direction="vertical"
                align="center"
                className="w-full mt-3"
              >
                <span className="text-sm font-semibold text-gray-500">
                  Skills
                </span>

                <Space split={<Divider type="vertical" />}>
                  {cv.skills?.length ? (
                    cv.skills.map((skill, idx) => (
                      <span key={idx} className="text-md font-semibold">
                        {typeof skill === "string"
                          ? skill
                          : skill?.name || "N/A"}
                      </span>
                    ))
                  ) : (
                    <span className="text-md font-semibold text-gray-400">
                      Chưa cập nhật
                    </span>
                  )}
                </Space>
              </Space>

            
              <Space size="middle" className="w-full flex justify-center mt-3">
                <SocialButton icon={<LinkedinOutlined />} bg="#0A66C2" />
                <SocialButton icon={<GithubOutlined />} bg="#24292e" />
                <SocialButton icon={<TwitterOutlined />} bg="#1DA1F2" />
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CV;
