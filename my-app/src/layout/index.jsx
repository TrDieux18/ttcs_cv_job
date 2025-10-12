import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./LayoutDefault.scss";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const LayoutDefault = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
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

  // Menu items cho Blogs
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
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          ) : (
            <>
              <NavLink to={"/login"}>
                <button className="btn">Login</button>
              </NavLink>
              <NavLink to={"/register"}>
                <button className="btn">Register</button>
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
