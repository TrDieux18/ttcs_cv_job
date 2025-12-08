import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Select, Input, Button, Card, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const optionCity = [
  { value: "", label: "Tất cả thành phố" },
  { value: "hanoi", label: "Hà Nội" },
  { value: "hochiminh", label: "Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
  { value: "haiphong", label: "Hải Phòng" },
];

const Home = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.append("location", city);
    if (keyword) params.append("search", keyword);
    navigate(`/jobs?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <motion.section
        className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Tìm Kiếm Công Việc IT Mơ Ước
          </h1>
          <p className="text-xl text-center mb-8 text-green-50">
            Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={city}
                className="w-full md:w-64"
                size="large"
                options={optionCity}
                onChange={setCity}
                placeholder="Chọn thành phố"
                style={{ height: "52px" }}
              />
              <Input
                placeholder="Nhập kỹ năng (Java, ReactJS...), vị trí, công ty..."
                size="large"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onPressEnter={handleKeyPress}
                className="flex-1"
                style={{
                  height: "52px",
                  fontSize: "16px",
                }}
              />
              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                className="px-8 font-semibold"
                style={{
                  background: "#16a34a",
                  borderColor: "#16a34a",
                  height: 52,
                  borderRadius: "8px",
                }}
              >
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-6 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Tag color="red" className="text-sm font-bold">
              NEW
            </Tag>
            <span className="font-semibold text-lg">
              Mẫu CV IT chuyên nghiệp
            </span>
            <span className="text-gray-600">
              Tạo CV ấn tượng, tăng cơ hội được tuyển dụng
            </span>
            <Button
              type="link"
              onClick={() => navigate("/templates")}
              className="text-green-600 font-semibold"
            >
              Khám phá ngay →
            </Button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card
            hoverable
            className="text-center"
            cover={
              <div className="flex items-center justify-center h-32 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-6xl">📄</div>
              </div>
            }
          >
            <Card.Meta
              title={
                <div className="flex items-center justify-center gap-2">
                  <span>Mẫu CV chuyên nghiệp</span>
                  <Tag color="green">NEW</Tag>
                </div>
              }
              description={
                <div>
                  <p className="text-gray-600 mb-4">
                    Tạo CV ấn tượng với các mẫu được thiết kế bởi chuyên gia
                  </p>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => navigate("/templates")}
                  >
                    Xem mẫu CV
                  </Button>
                </div>
              }
            />
          </Card>

          <Card
            hoverable
            className="text-center"
            cover={
              <div className="flex items-center justify-center h-32 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="text-6xl">📰</div>
              </div>
            }
          >
            <Card.Meta
              title="Blog IT"
              description={
                <div>
                  <p className="text-gray-600 mb-4">
                    Cập nhật tin tức, xu hướng công nghệ và kinh nghiệm nghề
                    nghiệp
                  </p>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => navigate("/blogs")}
                  >
                    Khám phá blog
                  </Button>
                </div>
              }
            />
          </Card>
        </section>

        <section className="text-center py-16 bg-white rounded-2xl shadow-sm mt-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Sẵn sàng bắt đầu hành trình mới?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tìm kiếm công việc phù hợp với kỹ năng và đam mê của bạn
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/jobs")}
              style={{
                background: "#16a34a",
                borderColor: "#16a34a",
                height: 48,
                fontSize: "16px",
                padding: "0 32px",
              }}
            >
              Khám phá việc làm
            </Button>
            <Button
              size="large"
              onClick={() => navigate("/templates")}
              style={{
                height: 48,
                fontSize: "16px",
                padding: "0 32px",
              }}
            >
              Tạo CV ngay
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
