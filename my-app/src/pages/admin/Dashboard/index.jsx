import { useEffect, useState } from "react";
import SalesChart from "./components/SalesChart";
import RecentOrders from "./components/RecentOrders";
import { Row, Col, message } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  BankOutlined,
  SolutionOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import * as DashboardService from "@services/admin/DashboardService";
import { LoadingSpinner, PageHeader, StatCard } from "@components/common";

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
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-full">
        <PageHeader
          title="Tổng quan hệ thống"
          subtitle="Thống kê tổng quan về hoạt động của hệ thống"
        />

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={8}>
            <StatCard
              title="Tổng người dùng"
              value={stats.totalUsers}
              icon={<UserOutlined />}
              iconColor="#1890ff"
              valueStyle={{ color: "#1890ff", fontWeight: "bold" }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              title="Tổng công ty"
              value={stats.totalCompanies}
              icon={<BankOutlined />}
              iconColor="#52c41a"
              valueStyle={{ color: "#52c41a", fontWeight: "bold" }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              title="Tin tuyển dụng"
              value={stats.totalJobs}
              icon={<FileTextOutlined />}
              iconColor="#fa8c16"
              valueStyle={{ color: "#fa8c16", fontWeight: "bold" }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              title="Tổng CV"
              value={stats.totalCVs}
              icon={<SolutionOutlined />}
              iconColor="#722ed1"
              valueStyle={{ color: "#722ed1", fontWeight: "bold" }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              title="Tổng ứng tuyển"
              value={stats.totalApplications}
              icon={<FileSearchOutlined />}
              iconColor="#eb2f96"
              valueStyle={{ color: "#eb2f96", fontWeight: "bold" }}
            />
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
