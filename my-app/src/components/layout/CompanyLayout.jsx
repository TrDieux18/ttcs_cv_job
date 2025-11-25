import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  ProfileOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, message, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "@store/UserReducer";
import { logout as logoutService } from "@services/common/AuthService";
import { deleteAllCookies } from "@helpers/cookie";

const { Header, Sider, Content } = Layout;

const CompanyLayout = () => {
  const user = useSelector((state) => state.user.user);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const sidebarItems = [
    {
      key: "/company/profile",
      icon: <UserOutlined />,
      label: "Hồ sơ công ty",
    },
    {
      key: "/company/my-jobs",
      icon: <FileTextOutlined />,
      label: "Tin tuyển dụng",
    },
    {
      key: "/company/cvs",
      icon: <ProfileOutlined />,
      label: "Quản lý CV",
    },
    {
      key: "/company/reports",
      icon: <BarChartOutlined />,
      label: "Báo cáo ",
    },

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutService();
      dispatch(logoutAction());
      deleteAllCookies();
      messageApi.success("Đăng xuất thành công!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      messageApi.error("Đăng xuất thất bại!");
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
      return;
    }
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        collapsedWidth={80}
        style={{
          backgroundColor: "#F5F7F9",
          borderRight: "2px solid #eee",
        }}
      >
        <div
          className="demo-logo-vertical text-center py-2 text-lg font-bold flex items-center justify-center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/company/my-jobs")}
        >
          {collapsed ? (
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full border object-cover"
            />
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg w-[78%] justify-center">
              <img
                src={user?.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-8 h-8 rounded-full border object-cover"
              />
              <span className="text-gray-700 font-medium text-[15px]">
                {user?.fullName || user?.companyName || "Công ty"}
              </span>
            </div>
          )}
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={sidebarItems}
          onClick={handleMenuClick}
          style={{
            fontSize: 15,
            backgroundColor: "#F5F7F9",
            borderRight: "none",
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 48,
              height: 48,
            }}
          />
        </Header>

        <Content
          style={{
            padding: "24px",
            background: colorBgContainer,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CompanyLayout;
