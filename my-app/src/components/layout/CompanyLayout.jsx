import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  ProfileOutlined,
  BarChartOutlined,
  HomeOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button, message, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "@store/UserReducer";
import { logout as logoutService } from "@services/common/AuthService";
import { deleteAllCookies } from "@helpers/cookie";

const { Header, Sider, Content } = Layout;

const CompanyLayout = () => {
  const user = useSelector((state) => state.user.user);
  console.log("🏢 CompanyLayout user:", user);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const sidebarItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Trang chủ",
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
      label: "Báo cáo tuyển dụng",
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
      console.error("Logout error:", error);
      messageApi.error("Đăng xuất thất bại!");
    }
  };

  const profileMenu = {
    items: [
      {
        key: "profile",
        label: "Hồ sơ công ty",
        icon: <UserOutlined />,
      },
      { type: "divider" },
      {
        key: "logout",
        label: "Đăng xuất",
        icon: <LogoutOutlined />,
        danger: true,
      },
    ],
    onClick: async ({ key }) => {
      if (key === "logout") {
        handleLogout();
      } else if (key === "profile") {
        navigate("/company/profile");
      }
    },
  };

  const handleMenuClick = ({ key }) => {
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
              src={user?.avatar || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-8 h-8 rounded-full border object-cover"
            />
          ) : (
            <div className="w-[90%] px-2 py-1 rounded-lg bg-[#fff] border-[#eee] border-[2px]">
              <Dropdown
                menu={profileMenu}
                trigger={["click"]}
                placement="bottom"
                arrow
                overlayClassName="custom-dropdown-two"
              >
                <div className="flex justify-between items-center gap-2 cursor-pointer select-none">
                  <div className="flex items-center gap-1">
                    <img
                      src={user?.avatar || "https://via.placeholder.com/40"}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border object-cover"
                    />
                    <span className="text-gray-700 font-medium text-sm">
                      {user?.fullName || user?.companyName || "Công ty"}
                    </span>
                  </div>
                  <DownOutlined
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  />
                </div>
              </Dropdown>
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
