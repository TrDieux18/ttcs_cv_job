import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Select, Input, Button } from "antd";

const optionCity = [
  { value: "all", label: "Tất cả thành phố" },
  { value: "hanoi", label: "Hà Nội" },
  { value: "hochiminh", label: "Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
  { value: "international", label: "Quốc tế" },
];

const suggestions = [
  "Java",
  "ReactJS",
  ".NET",
  "Tester",
  "PHP",
  "Business Analysis",
  "NodeJS",
  "Team Management",
];

const Home = () => {
  const [city, setCity] = useState("all");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    // TODO: Implement search navigation
    console.log("Searching for:", { city, keyword });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-green-600 to-teal-500 text-white text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            Khám Phá Hàng Ngàn Việc Làm IT
          </h1>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-xl p-6 flex gap-4 items-center max-w-3xl mx-auto mt-6">
            <Select
              defaultValue="all"
              className="w-56"
              bordered={false}
              options={optionCity}
              onChange={(value) => setCity(value)}
              size="large"
              style={{ height: "48px" }}
            />
            <Input
              placeholder="Enter keyword skill (Java, iOS...), job title, company..."
              bordered={false}
              size="large"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
              style={{
                height: "48px",
                fontSize: "16px",
              }}
            />
            <Button
              type="primary"
              size="large"
              onClick={handleSearch}
              className="flex items-center gap-2 px-8 font-semibold"
              style={{
                background: "#d43f3f",
                borderColor: "#d43f3f",
                height: 48,
                borderRadius: "8px",
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </motion.section>

      {/* CV Banner */}
      <section className="py-4 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-4">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
          <span className="font-semibold">Mẫu CV IT mới nhất</span>
          <p>Khám phá ngay mẫu CV mới nhất dành cho dân IT</p>
          <NavLink to="/templates" className="text-red-500 text-2xl">
            →
          </NavLink>
        </div>
      </section>

      {/* Feature Cards */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <img
              src="/src/assets/image/sach.png"
              alt="Passive Job Search"
              className="mx-auto h-20 mb-4"
            />
            <h3 className="font-bold text-lg">
              Passive Job Search{" "}
              <span className="text-xs bg-orange-400 text-white px-2 py-0.5 rounded-full ml-1">
                HOT
              </span>
            </h3>
            <p className="text-gray-600 my-2">
              Receive job invitations on ITviec just by uploading your CV
            </p>
            <Button
              type="default"
              shape="round"
              className="border-red-500 text-red-500"
            >
              Learn more
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <img
              src="/src/assets/image/image.png"
              alt="CV Templates"
              className="mx-auto h-20 mb-4"
            />
            <h3 className="font-bold text-lg">
              CV Templates{" "}
              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full ml-1">
                NEW
              </span>
            </h3>
            <p className="text-gray-600 my-2">
              Generate professional IT CV with new templates - recommended by
              recruiters
            </p>
            <Button
              type="default"
              shape="round"
              className="border-red-500 text-red-500"
            >
              View templates
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <img
              src="/src/assets/image/sach.png"
              alt="Blog"
              className="mx-auto h-20 mb-4"
            />
            <h3 className="font-bold text-lg">Blog</h3>
            <p className="text-gray-600 my-2">
              Updates about salary, benefits, working policies, and careers in
              IT
            </p>
            <Button
              type="default"
              shape="round"
              className="border-red-500 text-red-500"
            >
              Explore blog
            </Button>
          </div>
        </section>

        {/* Top Employers Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Top Employers
          </h2>

          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* NAB Innovation Centre Vietnam */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)",
                  }}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <img
                    src="https://via.placeholder.com/150x80?text=NAB"
                    alt="NAB"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-3 text-center min-h-[48px] flex items-center justify-center">
                  NAB Innovation Centre Vietnam
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[72px]">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    NodeJS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    ReactJS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Java
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Agile
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    DevOps
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Cloud
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600 text-xs">
                    Ha Noi - Ho Chi Minh
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-semibold text-sm">
                      6 Jobs
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>
            </div>

            {/* NAVER VIETNAM */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)",
                  }}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <img
                    src="https://via.placeholder.com/150x80?text=NAVER"
                    alt="NAVER"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-3 text-center min-h-[48px] flex items-center justify-center">
                  NAVER VIETNAM
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[72px]">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Swift
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Java
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    C language
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    ReactJS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Kotlin
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Android
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600 text-xs">
                    Ho Chi Minh - Ha Noi
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-semibold text-sm">
                      3 Jobs
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LG Electronics Development Vietnam */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)",
                  }}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <img
                    src="https://via.placeholder.com/150x80?text=LG"
                    alt="LG"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-3 text-center min-h-[48px] flex items-center justify-center">
                  LG Electronics Development Vietnam (LGEDV)
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[72px]">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Tester
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    OOP
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    C++
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Embedded
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Android
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600 text-xs">
                    Da Nang - Others - Ha Noi
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-semibold text-sm">
                      View company
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Persol Career Tech Studio Vietnam */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)",
                  }}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <img
                    src="https://via.placeholder.com/150x80?text=PERSOL"
                    alt="PERSOL"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-3 text-center min-h-[48px] flex items-center justify-center">
                  Persol Career Tech Studio Vietnam
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[72px]">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    .NET
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Spring
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    AWS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Azure
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Agile
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600 text-xs">Ho Chi Minh</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-semibold text-sm">
                      1 Job
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capgemini Vietnam */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)",
                  }}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <img
                    src="https://via.placeholder.com/150x80?text=Capgemini"
                    alt="Capgemini"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-3 text-center min-h-[48px] flex items-center justify-center">
                  Capgemini Vietnam
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[72px]">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    ReactJS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    AngularJS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Java
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    AWS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    iOS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Android
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600 text-xs">Ho Chi Minh</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-semibold text-sm">
                      5 Jobs
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Money Forward Vietnam */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)",
                  }}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <img
                    src="https://via.placeholder.com/150x80?text=MoneyFwd"
                    alt="Money Forward"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-3 text-center min-h-[48px] flex items-center justify-center">
                  MONEY FORWARD VIETNAM CO.,LTD
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[72px]">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    PHP
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Golang
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Ruby on Rails
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Database
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    SQL
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    English
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600 text-xs">
                    Ho Chi Minh - Ha Noi
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-semibold text-sm">
                      10 Jobs
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* MB Bank */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)",
                  }}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <img
                    src="https://via.placeholder.com/150x80?text=MB"
                    alt="MB Bank"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-3 text-center min-h-[48px] flex items-center justify-center">
                  MB Bank
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[72px]">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Java
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Oracle
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    AngularJS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    ReactJS
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600 text-xs">
                    Ha Noi - Ho Chi Minh
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-semibold text-sm">
                      27 Jobs
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sungrove Tech Vietnam */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)",
                  }}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                  <img
                    src="https://via.placeholder.com/150x80?text=Sungrove"
                    alt="Sungrove"
                    className="h-14 object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-3 text-center min-h-[48px] flex items-center justify-center">
                  Sungrove Tech Vietnam
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[72px]">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    NodeJS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Golang
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    Ruby on Rails
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    VueJS
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                    ReactJS
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600 text-xs">Ho Chi Minh</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-semibold text-sm">
                      View company
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles Section */}
        <section className="mt-16 mb-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured articles</h2>
            <NavLink
              to="/blogs"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              View all articles
              <span className="text-xl">›</span>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Featured Article */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-80 bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-white">
                  <div className="mb-6">
                    <img
                      src="https://via.placeholder.com/150x40?text=ITviec"
                      alt="ITviec"
                      className="h-8"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    ITviec ra mắt dịch vụ
                  </h3>
                  <h2 className="text-4xl font-bold mb-6">TALENTCONNECT</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-white/20 rounded-full">
                      S/E/H
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <img
                    src="https://via.placeholder.com/200x150?text=Person"
                    alt="Featured"
                    className="w-64 h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">
                  TalentConnect: Seamless connecting, limitless hiring!
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  ITviec introduces TalentConnect - new IT recruitment service
                  from ITviec that enables employers to connect directly with
                  high-quality IT candidates, without relying on job postings.
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                  Start reading
                  <span className="text-xl">›</span>
                </button>
              </div>
            </div>

            {/* Grid of 4 smaller articles */}
            <div className="grid grid-cols-2 gap-6">
              {/* Article 1 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-orange-400 to-orange-500">
                  <img
                    src="https://via.placeholder.com/300x200?text=Money+Forward"
                    alt="Money Forward"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm mb-2 line-clamp-2">
                    Hành trình xây nền tảng vững chắc cùng Money Forward
                    Vietnam: Tri...
                  </h4>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 mt-2">
                    Start reading
                    <span className="text-lg">›</span>
                  </button>
                </div>
              </div>

              {/* Article 2 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-gray-800 to-black">
                  <img
                    src="https://via.placeholder.com/300x200?text=AI+First"
                    alt="AI First"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm mb-2 line-clamp-2">
                    Từ Fintech đến AI-first: Hành trình chuyển mình của Money
                    Forward...
                  </h4>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 mt-2">
                    Start reading
                    <span className="text-lg">›</span>
                  </button>
                </div>
              </div>

              {/* Article 3 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src="https://via.placeholder.com/300x200?text=AWS+Cloud"
                    alt="AWS Study Tour"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm mb-2 line-clamp-2">
                    AWS study tour: First Cloud AI Journey - ITviec và AWS cùng
                    sin...
                  </h4>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 mt-2">
                    Start reading
                    <span className="text-lg">›</span>
                  </button>
                </div>
              </div>

              {/* Article 4 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-orange-600 to-orange-700">
                  <img
                    src="https://via.placeholder.com/300x200?text=AI+Career"
                    alt="AI Career Guide"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm mb-2 line-clamp-2">
                    The Ultimate guide: Navigating IT career survival and growth
                    in the...
                  </h4>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 mt-2">
                    Start reading
                    <span className="text-lg">›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
