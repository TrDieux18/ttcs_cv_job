import { useEffect, useState } from "react";
import SalesChart from "./components/SalesChart";
import RecentOrders from "./components/RecentOrders";
import { Card, Row, Col, Statistic, Spin, message } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  BankOutlined,
  SolutionOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import * as DashboardService from "@services/admin/DashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalCompanies: 0,
    totalCVs: 0,
    totalApplications: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, monthlyRes, activitiesRes] = await Promise.all([
        DashboardService.getDashboardStats(),
        DashboardService.getMonthlyStats(6),
        DashboardService.getRecentActivities(5),
      ]);

      if (statsRes.success) {
        setStats(statsRes.data);
      }

      if (monthlyRes.success) {
        setMonthlyData(monthlyRes.data);
      }

      if (activitiesRes.success) {
        setActivities(activitiesRes.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      message.error("Không thể tải dữ liệu dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Tổng quan hệ thống
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Thống kê tổng quan về hoạt động của hệ thống
          </p>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={8}>
            <Card className="shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <Statistic
                title="Tổng người dùng"
                value={stats.totalUsers}
                prefix={<UserOutlined className="text-blue-600" />}
                valueStyle={{ color: "#1890ff", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card className="shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <Statistic
                title="Tổng công ty"
                value={stats.totalCompanies}
                prefix={<BankOutlined className="text-green-600" />}
                valueStyle={{ color: "#52c41a", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card className="shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <Statistic
                title="Tin tuyển dụng"
                value={stats.totalJobs}
                prefix={<FileTextOutlined className="text-orange-600" />}
                valueStyle={{ color: "#fa8c16", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card className="shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <Statistic
                title="Tổng CV"
                value={stats.totalCVs}
                prefix={<SolutionOutlined className="text-purple-600" />}
                valueStyle={{ color: "#722ed1", fontWeight: "bold" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card className="shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <Statistic
                title="Tổng ứng tuyển"
                value={stats.totalApplications}
                prefix={<FileSearchOutlined className="text-pink-600" />}
                valueStyle={{ color: "#eb2f96", fontWeight: "bold" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Chart + Recent Activity */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <SalesChart data={monthlyData} />
          </Col>
          <Col xs={24} lg={8}>
            <RecentOrders activities={activities} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
