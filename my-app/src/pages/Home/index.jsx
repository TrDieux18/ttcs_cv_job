import React, { useState } from "react";
import "./Home.scss";
import { Button, Dropdown, Input, Menu, Space } from "antd";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("All Cities");
  const [keyword, setKeyword] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const cities = [
    "All Cities",
    "An Giang",
    "Ba Ria - Vung Tau",
    "Bac Giang",
    "Ha Noi",
    "TP Ho Chi Minh",
    "Da Nang",
    "International",
    "Others",
    // 👉 rút gọn, bạn giữ full list như code của bạn
  ];

  const handleSearch = () => {
    console.log("Searching jobs with:", { city, keyword });
    // Call API filter job ở đây
  };

  // Menu city (có search + scroll)
  const menu = (
    <div style={{ padding: 8, width: 220, maxHeight: 250, overflowY: "auto" }}>
      <Input
        placeholder="Search city..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Menu
        items={cities
          .filter((c) => c.toLowerCase().includes(searchCity.toLowerCase()))
          .map((c) => ({
            key: c,
            label: c,
            onClick: () => setCity(c),
          }))}
      />
    </div>
  );

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Top IT Jobs in Vietnam</h1>
          <p>Find your dream IT job. Trusted by thousands of developers.</p>

          {/* Search Bar */}
          <div className="search-bar">
            <Space size="middle" style={{ width: "100%", maxWidth: 700 }}>
              {/* Nút City */}
              <Dropdown trigger={["click"]} dropdownRender={() => menu}>
                <Button icon={<EnvironmentOutlined />}>{city}</Button>
              </Dropdown>

              {/* Input Keyword */}
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search jobs, skills, companies..."
                onPressEnter={handleSearch}
              />

              {/* Search Button */}
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Space>
          </div>
        </div>
      </section>

      <NavLink to="/templates">
        <h2>Mẫu CV IT mới nhất</h2>
        <h4>Khám phá ngay mẫu CV mới nhất dành cho dân IT</h4>
      </NavLink>

      <section className="feature-section"></section>

      {/* Featured Companies */}
      <section className="companies">
        <h2>Top IT Companies</h2>
        <div className="company-list">
          <div className="company-card">FPT Software</div>
          <div className="company-card">VNPT</div>
          <div className="company-card">Shopee</div>
          <div className="company-card">Tiki</div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="jobs">
        <h2>Latest Jobs</h2>
        <div className="job-list">
          <div className="job-card">
            <h3>Frontend Developer</h3>
            <p>Company: Shopee</p>
            <p>Salary: $1500 - $2000</p>
            <Button type="default">View Job</Button>
          </div>
          <div className="job-card">
            <h3>Backend Engineer</h3>
            <p>Company: Tiki</p>
            <p>Salary: $1200 - $1800</p>
            <Button type="default">View Job</Button>
          </div>
          <div className="job-card">
            <h3>DevOps Engineer</h3>
            <p>Company: FPT Software</p>
            <p>Salary: $1000 - $1600</p>
            <Button type="default">View Job</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
