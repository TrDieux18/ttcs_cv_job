import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Image, Button, Spin, message, Space } from "antd";
import {
  ArrowLeftOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { getCompanyById } from "@services/admin/CompanyService";

const DetailCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await getCompanyById(id);
        if (response.success) {
          setCompany(response.data);
        } else {
          message.error("Không thể tải thông tin công ty");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        message.error("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompany();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="text-center py-20">
          <p className="text-gray-500">Không tìm thấy thông tin công ty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-6">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/admin/companies")}
            className="mb-4"
          >
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Chi tiết công ty</h1>
          <p className="text-sm text-gray-500 mt-1">
            Xem thông tin chi tiết của công ty
          </p>
        </div>

        {/* Company Info */}
        <Card className="shadow-sm">
          <Space direction="vertical" size="large" className="w-full">
            {/* Logo and Basic Info */}
            <div className="flex items-start gap-6">
              {company.logo?.url ? (
                <Image
                  src={company.logo.url}
                  width={120}
                  height={120}
                  style={{ objectFit: "cover", borderRadius: "12px" }}
                  className="border-4 border-blue-100"
                />
              ) : (
                <div
                  className="flex items-center justify-center bg-gray-100 rounded-xl border-4 border-gray-200"
                  style={{ width: 120, height: 120 }}
                >
                  <TeamOutlined style={{ fontSize: 48, color: "#999" }} />
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {company.headline || "Chưa có tiêu đề"}
                </h2>

                <Space size="large" className="text-gray-600">
                  {company.location && (
                    <span className="flex items-center gap-1">
                      <EnvironmentOutlined />
                      {company.location}
                    </span>
                  )}
                  {company.size && (
                    <span className="flex items-center gap-1">
                      <TeamOutlined />
                      {company.size} nhân viên
                    </span>
                  )}
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <GlobalOutlined />
                      Website
                    </a>
                  )}
                </Space>
              </div>
            </div>

            {/* Detailed Information */}
            <Descriptions
              bordered
              column={1}
              labelStyle={{
                fontWeight: 600,
                backgroundColor: "#fafafa",
                width: "200px",
              }}
              contentStyle={{ backgroundColor: "#fff" }}
            >
              <Descriptions.Item label="Người quản lý">
                <div>
                  <div className="font-semibold text-gray-900">
                    {company.user?.fullName || "—"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {company.user?.email || "—"}
                  </div>
                </div>
              </Descriptions.Item>

              <Descriptions.Item label="Tiêu đề">
                {company.headline || "Chưa cập nhật"}
              </Descriptions.Item>

              <Descriptions.Item label="Mô tả">
                <div className="whitespace-pre-wrap">
                  {company.description || "Chưa có mô tả"}
                </div>
              </Descriptions.Item>

              <Descriptions.Item label="Website">
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {company.website}
                  </a>
                ) : (
                  "Chưa cập nhật"
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Địa điểm">
                {company.location || "Chưa cập nhật"}
              </Descriptions.Item>

              <Descriptions.Item label="Quy mô">
                {company.size ? `${company.size} nhân viên` : "Chưa cập nhật"}
              </Descriptions.Item>

              <Descriptions.Item label="Ngày tạo">
                {new Date(company.createdAt).toLocaleString("vi-VN")}
              </Descriptions.Item>

              <Descriptions.Item label="Cập nhật lần cuối">
                {new Date(company.updatedAt).toLocaleString("vi-VN")}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default DetailCompany;
