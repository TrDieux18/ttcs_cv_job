import { motion } from "framer-motion";
import {
  LuAward,
  LuBriefcase,
  LuHeart,
  LuTarget,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const features = [
  {
    icon: <LuBriefcase className="w-12 h-12 text-teal-600" />,
    title: "Hàng nghìn việc làm",
    description:
      "Kết nối với các công ty hàng đầu Việt Nam, cập nhật việc làm mới mỗi ngày",
  },
  {
    icon: <LuUsers className="w-12 h-12 text-teal-600" />,
    title: "Cộng đồng lớn mạnh",
    description:
      "Hơn 100,000+ ứng viên và 5,000+ nhà tuyển dụng tin tưởng sử dụng",
  },
  {
    icon: <LuAward className="w-12 h-12 text-teal-600" />,
    title: "CV chuyên nghiệp",
    description: "Tạo CV ấn tượng với các mẫu thiết kế hiện đại và dễ sử dụng",
  },
  {
    icon: <LuTrendingUp className="w-12 h-12 text-teal-600" />,
    title: "Phát triển sự nghiệp",
    description:
      "Công cụ và tài nguyên giúp bạn phát triển kỹ năng và thăng tiến",
  },
];

const values = [
  {
    icon: <LuHeart className="w-8 h-8 text-red-500" />,
    title: "Tận tâm",
    description: "Đặt lợi ích của ứng viên và nhà tuyển dụng lên hàng đầu",
  },
  {
    icon: <LuTarget className="w-8 h-8 text-blue-500" />,
    title: "Chính xác",
    description:
      "Cung cấp thông tin việc làm và ứng viên chính xác, đáng tin cậy",
  },
  {
    icon: <LuUsers className="w-8 h-8 text-green-500" />,
    title: "Kết nối",
    description: "Tạo cầu nối hiệu quả giữa ứng viên và doanh nghiệp",
  },
];
const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        className="bg-gradient-to-r from-green-700 to-teal-500 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
            <h1 className="text-5xl font-bold mb-6">Về chúng tôi</h1>
            <p className="text-xl leading-relaxed">
              Nền tảng tuyển dụng và quản lý CV hàng đầu Việt Nam, kết nối ứng
              viên tài năng với những cơ hội việc làm tuyệt vời
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 text-center leading-relaxed mb-6">
              Chúng tôi tin rằng mỗi người đều xứng đáng có một công việc phù
              hợp với năng lực và đam mê của mình. Sứ mệnh của chúng tôi là xây
              dựng một nền tảng công nghệ giúp đơn giản hóa quá trình tìm kiếm
              việc làm và tuyển dụng, tạo ra những kết nối có ý nghĩa giữa ứng
              viên và nhà tuyển dụng.
            </p>
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              Với công nghệ hiện đại và giao diện thân thiện, chúng tôi cam kết
              mang đến trải nghiệm tốt nhất cho cả ứng viên và doanh nghiệp
              trong hành trình phát triển sự nghiệp và xây dựng đội ngũ.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tại sao chọn chúng tôi?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Giá trị cốt lõi
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg border-2 border-gray-200 hover:border-teal-500 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-gradient-to-r from-green-700 to-teal-500 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-5xl font-bold mb-2">100K+</div>
              <div className="text-xl">Ứng viên</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">5K+</div>
              <div className="text-xl">Công ty</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-xl">Việc làm</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-xl">Hài lòng</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Sẵn sàng bắt đầu hành trình mới?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng ngàn ứng viên và nhà tuyển dụng đã tìm thấy thành
            công trên nền tảng của chúng tôi
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/jobs")}
              className="bg-gradient-to-r from-green-700 to-teal-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-shadow duration-300"
            >
              Tìm việc làm
            </button>
            <button className="border-2 border-teal-500 text-teal-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-colors duration-300">
              Đăng tuyển dụng
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
