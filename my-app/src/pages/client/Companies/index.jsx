import { getAllCompanies } from "@services/client/CompanyService";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiLocationMarker, HiUserGroup } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [followedCompanies, setFollowedCompanies] = useState([]);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 bg-gradient-to-br from-teal-90 to-teal-50 ">
        <motion.section
          className="bg-gradient-to-r from-green-700 to-teal-500 text-white py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6">Công ty hàng đầu</h1>
              <p className="text-xl leading-relaxed">
                Khám phá các công ty uy tín và môi trường làm việc tuyệt vời
                đang chờ đón bạn
              </p>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-[80%] mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((com) => (
              <motion.div
                key={com._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-32 bg-gradient-to-r from-green-600 to-teal-500">
                  <div className="absolute -bottom-10 left-6">
                    <div className="w-15 h-15 bg-white rounded-md overflow-hidden shadow-lg  flex items-center justify-center ">
                      <img
                        src={com.logo?.url || "https://via.placeholder.com/80"}
                        alt={com.user?.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-14 px-6 pb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {com.user?.fullName}
                  </h3>

                  <p className="text-sm text-teal-600 font-medium mb-3 line-clamp-1">
                    {com.headline}
                  </p>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
                    {com.description}
                  </p>

                  {/* Company Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <HiLocationMarker className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{com.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <HiUserGroup className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{com.size} nhân viên</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate(`/companies/${com.slug}`)}
                    className="w-full py-2.5 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-600 transition-all duration-300"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
