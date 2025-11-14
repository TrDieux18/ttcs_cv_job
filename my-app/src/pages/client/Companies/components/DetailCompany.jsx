import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCompanyBySlug } from "@services/client/CompanyService";
import { LuBriefcase, LuDollarSign, LuEarth, LuMapPin } from "react-icons/lu";
import { getRelativeTime } from "@helpers/getRelavtiveTime";

const DetailCompany = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);

  const jobSectionRef = useRef(null);

  const handleScrollToJobs = () => {
    jobSectionRef.current?.scrollIntoView({
      behavior: "smooth", // Cuộn mượt
      block: "start",
    });
  };

  useEffect(() => {
    if (!slug) {
      return;
    }
    const fetchCompanyDetail = async () => {
      try {
        const response = await getCompanyBySlug(slug);
        console.log("Company details:", response);
        if (response.success) {
          setCompany(response.data.company || null);
          setJobs(response.data.jobs || []);
        }
      } catch (error) {
        console.error("Failed to fetch company details:", error);
      }
    };
    fetchCompanyDetail();
  }, [slug]);
  console.log("Rendered company:", jobs, company);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">
          Đang tải thông tin công ty...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 ">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Company Header */}
        <motion.div
          className="bg-gradient-to-r from-green-700 to-teal-500 text-white py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-8">
              <div className="w-36 h-36 rounded-md overflow-hidden bg-white shadow-xl flex-shrink-0">
                <img
                  src={company?.logo?.url || "https://via.placeholder.com/128"}
                  alt={company?.user?.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-6 flex-1">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl font-bold">
                    {company?.user?.fullName}
                  </h1>

                  <div className="flex gap-6 items-center text-sm mt-1">
                    <span className="flex items-center gap-2">
                      <LuMapPin className="w-4 h-4" />
                      {company?.location}
                    </span>
                    <span
                      onClick={handleScrollToJobs}
                      className="flex items-center gap-2 underline cursor-pointer"
                    >
                      <LuBriefcase className="w-4 h-4" />
                      {jobs.length} việc làm đang tuyển dụng
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="w-40 px-6 py-2.5 bg-white text-teal-600 rounded-sm shadow-md hover:bg-gray-50 transition-all duration-300 font-semibold">
                    Theo dõi
                  </button>
                  <button className="w-40 px-6 py-2.5 bg-white/20 text-white rounded-sm hover:bg-white/30 transition-all duration-300 font-semibold">
                    Viết đánh giá
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between ">
          <motion.div
            className=" w-[65%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white shadow-md rounded-xl px-6 py-8 border border-[#ddd] mb-4">
              <h2 className="text-2xl font-bold pb-4 text-gray-800 border-b border-dashed border-[#dedede]">
                Thông tin chung
              </h2>
              <div className="grid grid-cols-3 gap-x-5 gap-y-4 pt-4">
                <p className="flex flex-col">
                  <span className="text-sm text-gray-400">Mô hình công ty</span>
                  <span>{company?.companyModel}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-sm text-gray-400">
                    Lĩnh vực công ty
                  </span>
                  <span>{company?.industry}</span>
                </p>

                <p className="flex flex-col">
                  <span className="text-sm text-gray-400">Quy mô công ty</span>
                  <span>{company?.size}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-sm text-gray-400">Quốc gia</span>
                  <span>{company?.country}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-sm text-gray-400">
                    Thời gian làm việc
                  </span>
                  <span>{company?.workTime}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-sm text-gray-400">Tăng ca</span>
                  <span>Không có</span>
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl px-6 py-8 border border-[#ddd]">
              <h2 className="text-2xl font-bold pb-4 text-gray-800 border-b border-dashed border-[#dedede]">
                Giới thiệu công ty
              </h2>
              <div className="pt-4 flex flex-col gap-4 text-gray-700 leading-relaxed text-[17px]">
                <p>{company?.headline}</p>
                <p>{company?.description}</p>
                <p>{company?.about}</p>
              </div>

              <div className="mt-4 border-t border-dashed border-[#dedede] text-blue-500">
                <a
                  href={company?.website}
                  target="_blank"
                  className="flex items-center gap-2 pt-4"
                >
                  <LuEarth size={16} />
                  <span>Website công ty</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="pl-7 w-[35%] flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-[22px] font-bold text-gray-800 pb-6 pt-3">
              {jobs.length} việc làm đang tuyển dụng
            </h2>

            {jobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`bg-white rounded-lg p-4 shadow-md cursor-pointer transition-all border-2 hover:shadow-lg
                     border-transparent hover:border-gray-200
                `}
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

                <a
                  href={`/jobs/${job._id}`}
                  className="text-lg font-bold text-gray-800 mb-3 hover:text-red-500 transition-colors duration-200 block"
                >
                  {job.title}
                </a>

                {/* Company Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded flex items-center justify-center text-white font-bold text-xl">
                    <img
                      src={company?.logo.url}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {company?.user.fullName || "Company"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-green-600 font-semibold  ">
                  <LuDollarSign size={18} />
                  <span>{job.salary}</span>
                </div>

                <hr className="border-b border-dashed border-[#dedede] my-3" />

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
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:outline hover:outline-gray-300 "
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default DetailCompany;
