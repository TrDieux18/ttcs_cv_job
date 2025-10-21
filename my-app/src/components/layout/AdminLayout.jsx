import { Menu } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, message } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "@services/common/AuthService";

const AdminLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const items = [
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
  ];

  const handleMenuClick = async ({ key }) => {
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
      console.log("Đi tới trang cá nhân...");
    }
  };

  const sidebarItems = [
    { label: "Tổng quan", path: "/admin/dashboard" },
    { label: "Người dùng", path: "/admin/users" },

    { label: "Vai trò", path: "/admin/roles" },
    { label: "Phân quyền", path: "/admin/roles/permission" },
  ];

  return (
    <>
      {contextHolder}
      <div className="min-h-screen w-full bg-[#f8fafc] relative flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/70 shadow-md z-10 relative hidden md:flex flex-col">
          <div className="p-4 text-xl font-bold h-16 border-b">Admin Panel</div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block p-2 rounded-md hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col relative z-10">
          <header className="h-16 bg-white/70 w-full flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <div className="flex items-center gap-2 cursor-pointer select-none">
                <span className="text-gray-700 font-medium">Admin</span>
                <img
                  src="https://i.pravatar.cc/40"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border"
                />
                <DownOutlined className="text-gray-500 text-xs" />
              </div>
            </Dropdown>
          </header>

          <main className="p-4 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
