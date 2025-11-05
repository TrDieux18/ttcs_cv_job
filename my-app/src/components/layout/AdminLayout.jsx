import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  PartitionOutlined,
  DownOutlined,
  BankOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button, message, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "@services/common/AuthService";
import { useSelector } from "react-redux";
import { LuFileUser } from "react-icons/lu";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const user = useSelector((state) => state.user.user);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sidebarItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Tổng quan",
    },
    {
      key: "/admin/users",
      icon: <TeamOutlined />,
      label: "Người dùng",
    },
    {
      key: "/admin/roles",
      icon: <SettingOutlined />,
      label: "Vai trò",
    },
    {
      key: "/admin/roles-permission",
      icon: <PartitionOutlined />,
      label: "Phân quyền",
    },
    {
      key: "/admin/companies",
      icon: <BankOutlined />,
      label: "Công ty",
    },
    {
      key: "/admin/jobs",
      icon: <CarryOutOutlined />,
      label: "Việc làm",
    },
    {
      key: "/admin/cvs",
      icon: <LuFileUser />,
      label: "Hồ sơ ứng viên",
    },
  ];

  const profileMenu = {
    items: [
      {
        key: "profile",
        label: "Hồ sơ cá nhân",
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
        const response = await logout();
        if (response.success) {
          localStorage.removeItem("user");
          messageApi.success("Đăng xuất thành công");
          setTimeout(() => navigate("/admin/auth/login"), 800);
        } else {
          messageApi.error("Đăng xuất thất bại");
        }
      } else if (key === "profile") {
        navigate("/admin/profile");
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
          onClick={() => navigate("/admin/dashboard")}
        >
          {collapsed ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full border object-cover"
            />
          ) : (
            <div className="w-[90%] px-2 py-1  rounded-lg bg-[#fff] border-[#eee] border-[2px]">
              <Dropdown
                menu={profileMenu}
                trigger={["click"]}
                placement="bottom"
                arrow
                overlayClassName="custom-dropdown-two"
              >
                <div className="flex justify-between items-center gap-2 cursor-pointer select-none  ">
                  <div className="flex items-center gap-1">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border object-cover"
                    />
                    <span className="text-gray-700 font-medium">
                      {user.fullName}
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
          defaultSelectedKeys={["/admin/dashboard"]}
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
            padding: "0 16px",
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

export default AdminLayout;
