import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "@services/client/JobsService";
import { Select, Input, Button } from "antd";
import {
  LuMapPin,
  LuSearch,
  LuBriefcase,
  LuDollarSign,
  LuHeart,
  LuExternalLink,
  LuClock,
 
} from "react-icons/lu";


const parseHTMLList = (html) => {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const items = doc.querySelectorAll("li");
  return Array.from(items).map((item) => item.textContent);
};


const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) return `Đăng ${diffHours} giờ trước`;
  if (diffDays < 7) return `Đăng ${diffDays} ngày trước`;
  return `Đăng ${Math.floor(diffDays / 7)} tuần trước`;
};




const optionCity = [
  {
    value: "all",
    label: <span style={{ fontSize: 16 }}>Tất cả thành phố</span>,
  },
  { value: "hanoi", label: <span style={{ fontSize: 16 }}>Hà Nội</span> },
  {
    value: "hochiminh",
    label: <span style={{ fontSize: 16 }}>Hồ Chí Minh</span>,
  },
  { value: "danang", label: <span style={{ fontSize: 16 }}>Đà Nẵng</span> },
  { value: "haiphong", label: <span style={{ fontSize: 16 }}>Hải Phòng</span> },
  { value: "cantho", label: <span style={{ fontSize: 16 }}>Cần Thơ</span> },
];

export default function JobList() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        console.log("Jobs fetched:", response);
        const jobsData = response.data || [];
        setJobs(jobsData);
        if (jobsData.length > 0) {
          setSelectedJob(jobsData[0]);
        }
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-100 via-white to-teal-50">
      <div className="w-full bg-gradient-to-r from-green-600 to-teal-500 shadow-lg py-8 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 flex gap-4 items-center">
            <Select
              suffixIcon={<LuMapPin size={18} className="text-gray-400" />}
              defaultValue="all"
              options={optionCity}
              className="w-56"
              size="large"
              style={{ height: "48px" }}
            />

            <Input
              prefix={<LuSearch size={20} className="text-gray-400" />}
              placeholder="Tìm kiếm theo kỹ năng, chức vụ, công ty..."
              size="large"
              className="flex-1 rounded-lg"
              style={{
                height: "48px",
                fontSize: "16px",
              }}
            />

            <Button
              type="primary"
              size="large"
              icon={<LuSearch size={20} />}
              className="flex items-center gap-2 px-8 font-semibold"
              style={{
                background: "#d43f3f",
                borderColor: "#d43f3f",
                height: 48,
                borderRadius: "8px",
              }}
            >
              Tìm Kiếm
            </Button>
          </div>
        </div>
      </div>

      {/* DANH SÁCH JOB */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Đang tải việc làm...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              Không tìm thấy việc làm phù hợp
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className="lg:col-span-1 space-y-4 h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white rounded-lg p-4 shadow-md cursor-pointer transition-all border-2 hover:shadow-lg ${
                    selectedJob?._id === job._id
                      ? "border-red-400"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-sm">
                      {getRelativeTime(job.createdAt)}
                    </span>
                    {job.isFeatured && (
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-xs font-bold">
                        HOT
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {job.title}
                  </h3>

                  {/* Company Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded flex items-center justify-center text-white font-bold text-xl">
                      <img
                        src={job.company?.logo.url}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {job.company?.fullName || "Company"}
                    </span>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-2 text-green-600 font-semibold mb-3">
                    <LuDollarSign size={18} />
                    <span>{job.salary}</span>
                  </div>

                  {/* Experience & Degree */}
                  {job.experienceRequirement && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <span>✓ {job.experienceRequirement}</span>
                    </div>
                  )}

                  {/* Category */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <LuBriefcase size={16} />
                    <span>{job.category}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <LuMapPin size={16} />
                    <span>
                      {job.jobType} • {job.location}
                    </span>
                  </div>

                  {/* Keywords/Skills */}
                  {job.keywords && job.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.keywords.slice(0, 4).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right: Job Detail */}
            {selectedJob && (
              <motion.div
                key={selectedJob._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-white rounded-lg shadow-lg sticky top-4 h-[calc(100vh-120px)] flex flex-col"
              >
                {/* Fixed Header Section */}
                <div className="p-6 pb-0 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded bg-white border-2 border-gray-200 flex items-center justify-center flex-shrink-0 p-2">
                        <img
                          src={selectedJob.company?.logo.url}
                          alt={selectedJob.company?.fullName}
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                          {selectedJob.title}
                          <LuExternalLink
                            size={20}
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                          />
                        </h2>
                        <p className="text-gray-700 font-medium mb-2">
                          {selectedJob.company?.fullName}
                        </p>
                        <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                          <LuDollarSign size={20} />
                          <span>{selectedJob.salary}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                      <LuHeart
                        size={28}
                        className="text-red-400 hover:text-red-500"
                      />
                    </button>
                  </div>

                  {/* Apply Button */}
                  <Button
                    type="primary"
                    size="large"
                    className="w-full mb-4"
                    style={{
                      background: "#d43f3f",
                      borderColor: "#d43f3f",
                      height: 48,
                    }}
                  >
                    Ứng tuyển
                  </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 pt-4">
                  {/* Job Type and Time Info */}
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <LuBriefcase size={18} />
                    <span>{selectedJob.jobType || "Full-time"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <LuClock size={18} />
                    <span>{getRelativeTime(selectedJob.createdAt)}</span>
                  </div>

                  {/* Keywords */}
                  {selectedJob.keywords && selectedJob.keywords.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Kỹ năng:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm inline-block"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Chuyên môn:
                    </h3>
                    <span className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm inline-block">
                      {selectedJob.category}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Địa điểm:
                    </h3>
                    <div className="flex items-start gap-2 text-gray-700">
                      <LuMapPin size={18} className="mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{selectedJob.location}</p>
                        {selectedJob.specificAddress && (
                          <p className="text-sm text-gray-600 mt-1">
                            {selectedJob.specificAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  {selectedJob.benefits && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Phúc lợi
                      </h3>
                      <ul className="space-y-2">
                        {parseHTMLList(selectedJob.benefits).map(
                          (benefit, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <span className="text-red-500 mt-1">•</span>
                              <span>{benefit}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Job Description */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Mô tả công việc
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* Requirements */}
                  {selectedJob.requirements && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Yêu cầu công việc
                      </h3>
                      <ul className="space-y-2">
                        {parseHTMLList(selectedJob.requirements).map(
                          (req, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{req}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Additional Requirements */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Học vấn</p>
                      <p className="font-semibold text-gray-800">
                        {selectedJob.degreeRequirement}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Giới tính</p>
                      <p className="font-semibold text-gray-800">
                        {selectedJob.genderRequirement}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
