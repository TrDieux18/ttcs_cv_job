import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const ForeignLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Basic");
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState("");

  // Thêm ngôn ngữ vào danh sách
  const handleAdd = () => {
    if (!selectedLanguage) {
      setError("Vui lòng chọn ngôn ngữ!");
      return;
    }

    // Kiểm tra trùng
    const existed = languages.some(
      (item) =>
        item.language === selectedLanguage && item.level === selectedLevel
    );
    if (existed) {
      alert("Ngôn ngữ này đã tồn tại trong danh sách");
      return;
    }

    const newLang = { language: selectedLanguage, level: selectedLevel };
    setLanguages([...languages, newLang]);

    setSelectedLanguage("");
    setSelectedLevel("Basic");
  };

  // Xóa chip
  const handleRemove = (index) => {
    const updated = [...languages];
    updated.splice(index, 1);
    setLanguages(updated);
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative m-3">
      <div className="flex p-3">
        <h1 className="text-3xl font-bold text-center py-5">Ngoại ngữ</h1>
        <button
          className="absolute right-2 top-2"
          onClick={() => setIsOpen(true)}
        >
          <CiCirclePlus className="size-10 text-red-600" />
        </button>
      </div>
      <hr />

      {/* Hiển thị danh sách ngôn ngữ */}
      <div className="p-3 flex flex-wrap gap-3">
        {languages.length > 0 ? (
          languages.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm"
            >
              <span className="font-semibold">{item.language}</span>
              <span className="text-gray-600">({item.level})</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Liệt kê các ngôn ngữ bạn biết</p>
        )}
      </div>

      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-250">
            <h1 className="text-4xl font-semibold mb-4">Ngoại ngữ</h1>
            <hr />

            <div className="mt-4">
              <p className="font-bold">Danh sách ngôn ngữ: </p>
              <div className="flex gap-4">
                {/* Select Language */}
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="border border-gray-300 rounded-md h-13 w-110 px-2 shadow-lg"
                >
                  <option value="">Tìm ngôn ngữ </option>
                  <option value="Tiếng Việt">Tiếng Việt</option>
                  <option value="Tiếng Anh">Tiếng Anh</option>
                  <option value="Tiếng Nhật">Tiếng Nhật</option>
                  <option value="Tiếng Trung">Tiếng Trung</option>
                  <option value="Tiếng Pháp">Tiếng Pháp</option>
                  <option value="Tiếng Ý">Tiếng Ý</option>
                </select>

                {/* Select Level */}
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="border border-gray-300 rounded-md h-13 w-110 px-2 shadow-lg"
                >
                  <option value="">Chọn trình độ</option>
                  <option value="Sơ cấp">Sơ cấp</option>
                  <option value="Trung cấp">Trung cấp</option>
                  <option value="Nâng cao">Nâng cao</option>
                  <option value="Thành thạo">Thành thạo</option>
                </select>

                {/* Add button */}
                <button
                  onClick={handleAdd}
                  className="border border-red-600 text-red-600 rounded-md w-13"
                >
                  +
                </button>
              </div>

              {/* Chip hiển thị trong popup */}
              <div className="flex flex-wrap gap-3 mt-4">
                {languages.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm"
                  >
                    <span className="font-semibold">{item.language}</span>
                    <span className="text-gray-600">({item.level})</span>

                    <button
                      onClick={() => handleRemove(index)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
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

export default ForeignLanguage;
