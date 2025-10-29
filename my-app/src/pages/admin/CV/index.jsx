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
        const response = await getAllCvs();
        setCvs(response.data);
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };
    fetchCvs();
  }, []);
  return (
    <>
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
                style={{ border: "2px solid #eee" }}
                styles={{
                  body: {
                    padding: "8px 12px",
                  },
                }}
                onClick={() => navigate(`/admin/cvs/detail/${cv._id}`)}
              >
                <Space
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={`${cv.userId.avatar}` || "/default-avatar.png"}
                    alt="Avatar"
                    width={80}
                    height={80}
                    style={{
                      borderRadius: "55%",
                      background: "#3875F6",
                      objectFit: "cover",
                    }}
                  />
                  <span className="text-xl font-semibold">
                    {formatName(cv.userId.fullName)}
                  </span>
                  <span className="text-gray-500 text-sm font-semibold">
                    {cv.title}
                  </span>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Space
                    style={{
                      marginTop: 10,
                      marginBottom: 5,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span className="text-sm font-semibold text-gray-500">
                      Skills
                    </span>
                    <Space split={<Divider type="vertical" />}>
                      {cv.skills.length > 0 ? (
                        cv.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="text-md font-semibold divide-amber-500"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-md font-semibold divide-amber-500">
                          Chưa cập nhật
                        </span>
                      )}
                    </Space>
                  </Space>

                  <Space size={"middle"}>
                    <Button
                      type="text"
                      icon={<LinkedinOutlined />}
                      style={{
                        backgroundColor: "#0A66C2",
                        color: "white",
                        fontSize: 18,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                      }}
                    />
                    <Button
                      type="text"
                      icon={<GithubOutlined />}
                      style={{
                        backgroundColor: "#24292e",
                        color: "white",
                        fontSize: 18,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                      }}
                    />
                    <Button
                      type="text"
                      icon={<TwitterOutlined />}
                      style={{
                        backgroundColor: "#1DA1F2",
                        color: "white",
                        fontSize: 18,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                      }}
                    />
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default CV;
