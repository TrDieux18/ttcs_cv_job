import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LuBuilding2, LuUser, LuMail, LuLock, LuUserPen } from "react-icons/lu";
import { message } from "antd";
import { register } from "@services/common/AuthService";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate"); // ✅ đổi mặc định từ "user" → "candidate"
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const payload = {
      fullName,
      username,
      email,
      password,
      role, // ✅ gửi candidate hoặc company
    };

    console.log("Registration payload:", payload);

    try {
      const res = await register(payload);

      if (res.success) {
        message.success("🎉 Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      } else {
        setError(res.errors?.[0] || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-green-50 py-5 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white p-8 md:p-6 rounded-xl shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          👋 Tạo tài khoản
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-6 text-center bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vai trò */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors duration-200 ${
                role === "candidate"
                  ? "border-green-500 bg-green-50 text-green-700 font-semibold"
                  : "border-gray-300 text-gray-600 hover:border-green-400"
              }`}
            >
              <LuUser size={18} /> Ứng viên
            </button>
            <button
              type="button"
              onClick={() => setRole("company")}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors duration-200 ${
                role === "company"
                  ? "border-green-500 bg-green-50 text-green-700 font-semibold"
                  : "border-gray-300 text-gray-600 hover:border-green-400"
              }`}
            >
              <LuBuilding2 size={18} /> Nhà tuyển dụng
            </button>
          </div>

          {/* Họ và tên */}
          <div>
            <label
              htmlFor="fullName"
              className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700"
            >
              <LuUser size={15} />
              {role === "candidate" ? "Họ và tên" : "Tên công ty"}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder={
                role === "candidate" ? "Nguyễn Văn A" : "FPT Software"
              }
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700"
            >
              <LuUserPen size={15} />
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder={role === "candidate" ? "nguyenvana" : "fptsoftware"}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700"
            >
              <LuMail size={15} />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={
                role === "candidate"
                  ? "nguyenvana@example.com"
                  : "fptsoftware@example.com"
              }
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label
              htmlFor="password"
              className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700"
            >
              <LuLock size={15} />
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed text-base"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        {/* Link Login */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-600 hover:text-green-700 hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
