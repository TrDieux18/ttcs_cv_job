import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { logout } from "@services/common/AuthService";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./LayoutDefault.scss";

import {
  LuBell,
  LuBriefcase,
  LuFileText,
  LuInbox,
  LuLayoutDashboard,
  LuLogOut,
  LuSettings,
  LuUser,
} from "react-icons/lu";
import { useSelector } from "react-redux";

const LayoutDefault = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      localStorage.removeItem("user");
      message.success("Đăng xuất thành công");
      setTimeout(() => navigate("/login"), 800);
    } else {
      message.error("Đăng xuất thất bại");
    }
  };

  // Menu items cho Jobs
  const jobItems = [
    {
      key: "1",
      label: <NavLink to="/jobs/skill">Jobs by Skill</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to="/jobs/expertise">Jobs by Expertise</NavLink>,
    },
    {
      key: "3",
      label: <NavLink to="/jobs/title">Jobs by Title</NavLink>,
    },
    {
      key: "4",
      label: <NavLink to="/jobs/company">Jobs by Company</NavLink>,
    },
    {
      key: "5",
      label: <NavLink to="/jobs/city">Jobs by City</NavLink>,
    },
  ];

  // Menu items cho IT Companies
  const companyItems = [
    {
      key: "1",
      label: (
        <NavLink to="/companies/vietnam-best-it-companies">
          Vietnam Best IT Conpanies
        </NavLink>
      ),
    },
    {
      key: "2",
      label: <NavLink to="/companies/review">Company Reviews</NavLink>,
    },
  ];

  const blogItems = [
    {
      key: "1",
      label: <NavLink to="/blogs/salary-report">IT Salary Report</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to="/blogs/career">IT Career</NavLink>,
    },
    {
      key: "3",
      label: <NavLink to="/blogs/apply">Applying & Career Up</NavLink>,
    },
    {
      key: "4",
      label: <NavLink to="/blogs/expertise">IT Expertise</NavLink>,
    },
  ];

  const profieMenuItems = [
    {
      key: "dashboard",
      label: "Tổng quan",
      icon: <LuLayoutDashboard size={16} />,
    },
    {
      key: "cv",
      label: "Hồ sơ đính kèm",
      icon: <LuFileText size={16} />,
    },
    {
      key: "profile",
      label: "Hồ sơ cá nhân",
      icon: <LuUser size={16} />,
    },
    {
      key: "job",
      label: "Việc làm của tôi",
      icon: <LuBriefcase size={16} />,
    },
    {
      key: "invitation",
      label: "Lời mời công việc",
      icon: <LuInbox size={16} />,
    },
    {
      key: "notification",
      label: "Thông báo",
      icon: <LuBell size={16} />,
    },
    {
      key: "setting",
      label: "Cài đặt",
      icon: <LuSettings size={16} />,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LuLogOut size={16} />,
    },
  ];

  const profieMenu = {
    items: [
      {
        key: "user-info",
        label: (
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt="avatar"
              className="w-10 h-10 rounded-full border object-cover"
            />
            <div>
              <h4 className="font-semibold text-[16px] text-gray-900">
                {user?.fullName}
              </h4>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
        ),
        disabled: true,
      },
      {
        type: "divider",
      },
      ...profieMenuItems,
    ],
    onClick: async ({ key }) => {
      if (key === "logout") {
        handleLogout();
      } else {
        navigate(`/${key}`);
      }
    },
  };

  return (
    <div className="layout-default">
      <header className="layout-header">
        <div className="layout-header__logo">
          <NavLink to={"/"}>Home</NavLink>
        </div>
        <div className="layout-header__menu">
          <ul>
            <li>
              <Dropdown menu={{ items: jobItems }}>
                <span className="dropdown-link">
                  <Space>
                    Jobs
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </li>
            <li>
              <Dropdown menu={{ items: companyItems }}>
                <span className="dropdown-link">
                  <Space>
                    IT Companies
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </li>
            <li>
              <Dropdown menu={{ items: blogItems }}>
                <span className="dropdown-link">
                  <Space>
                    Blog
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </li>
            <li>
              <NavLink to={"/templates"}>CV IT Templates</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
          </ul>
        </div>
        <div className="layout-header__account">
          {user ? (
            <div>
              <Dropdown
                menu={profieMenu}
                trigger={["hover"]}
                placement="bottomLeft"
                overlayStyle={{
                  width: 280,
                }}
                overlayClassName="custom-dropdown"
              >
                <div className="relative cursor-pointer">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border object-cover"
                  />
                  <span className="absolute right-0 bottom-[-1px] w-4 h-4 rounded-full flex items-center justify-center bg-white">
                    <RiArrowDropDownLine />
                  </span>
                </div>
              </Dropdown>
            </div>
          ) : (
            <>
              <NavLink to={"/login"}>
                <button className="btn">Đăng nhập</button>
              </NavLink>
              <NavLink to={"/register"}>
                <button className="btn">Đăng kí</button>
              </NavLink>
            </>
          )}
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutDefault;
