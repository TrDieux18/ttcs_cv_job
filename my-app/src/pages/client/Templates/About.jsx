import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [user, setUser] = useState({
    text: "",
  });
  // Mở dialog
  const handleOpenDialog = () => {
    setText(user.text); // hiển thị nội dung cũ (nếu có)
    setIsOpen(true);
  };
  // Cập nhật giá trị khi người dùng nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };
  // Lưu giá trị mới
  const handleSave = () => {
    setUser({ text });
    setIsOpen(false);
    console.log("Dữ liệu đã lưu:", text);
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg opacity-100 shadow-lg relative m-3">
      <div className="flex p-3">
        <h1 className="text-3xl font-bold text-center py-5">
          Giới thiệu bản thân
        </h1>
        <button
          className="absolute right-2 top-2"
          onClick={() => setIsOpen(true)}
        >
          <CiCirclePlus className="size-10 text-red-600" />
        </button>
      </div>
      <hr />
      {/* hiển thị nội dung */}
      <p className="text-truncated ims-2 text-rich-grey p-3">
        <span
          dir="auto"
          className=" align-middle whitespace-pre-line"
        >
          {user.text && user.text.trim() !== "" ? (
            user.text
          ) : (
            <p className="text-gray-500 italic">
              Thể hiện những thông tin chi tiết về quá trình làm việc
            </p>
          )}
        </span>
      </p>
      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6  shadow-lg text-center w-250 h-auto">
            <h1 className="text-4xl font-semibold mb-4">Thông tin cá nhân</h1>
            <hr />
            <div className="p-6">
              <label
                htmlFor="about"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Giới thiệu bản thân
              </label>

              <textarea
                id="about"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nhập mô tả, nhấn Enter để xuống dòng..."
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
              />

              <p className="mt-2 text-gray-500">Ký tự: {text.length}</p>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                className="w-25 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default About;
