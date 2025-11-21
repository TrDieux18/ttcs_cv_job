import { message, Select } from "antd";
import { useState, useEffect } from "react";
import { LuCirclePlus } from "react-icons/lu";

const ForeignLanguage = ({ profileData, updatedProfileData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Sơ cấp");
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      profileData?.foreignLanguages &&
      Array.isArray(profileData.foreignLanguages)
    ) {
      setLanguages(profileData.foreignLanguages);
    }
  }, [profileData]);

  const handleAdd = () => {
    if (!selectedLanguage) {
      setError("Vui lòng chọn ngôn ngữ!");
      return;
    }

    const existed = languages.some(
      (item) =>
        item.language === selectedLanguage && item.level === selectedLevel
    );
    if (existed) {
      message.error("Ngôn ngữ đã được thêm trước đó!");
      return;
    }

    const newLang = { language: selectedLanguage, level: selectedLevel };
    setLanguages([...languages, newLang]);

    setSelectedLanguage("");
    setSelectedLevel("Basic");
  };

  const handleRemove = (index) => {
    const updated = [...languages];
    updated.splice(index, 1);
    setLanguages(updated);
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative">
      <div className="w-full h-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[22px] font-bold">Ngoại ngữ</h1>

          <button onClick={() => setIsOpen(true)}>
            <LuCirclePlus className="size-4 text-red-600 hover:scale-110 transition-transform" />
          </button>
        </div>

        {languages.length > 0 && <hr className="mt-4 mb-3 border-gray-300" />}

        <div className="align-middle mt-2 flex flex-wrap gap-3">
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
            <p className="text-gray-500">Liệt kê các ngôn ngữ bạn biết</p>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-250 h-auto text-left">
            <h1 className="text-[22px] font-semibold px-8 py-4 border-b border-gray-300">
              Ngoại ngữ
            </h1>

            <div className="px-8 py-6">
              <p className="font-bold mb-2">Danh sách ngôn ngữ:</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-semibold mb-1 block">Ngôn ngữ</label>
                  <Select
                    value={selectedLanguage || undefined}
                    onChange={(value) => setSelectedLanguage(value)}
                    placeholder="Tìm ngôn ngữ"
                    className="w-full"
                    size="large"
                    showSearch
                  >
                    <Select.Option value="Tiếng Việt">Tiếng Việt</Select.Option>
                    <Select.Option value="Tiếng Anh">Tiếng Anh</Select.Option>
                    <Select.Option value="Tiếng Nhật">Tiếng Nhật</Select.Option>
                    <Select.Option value="Tiếng Trung">
                      Tiếng Trung
                    </Select.Option>
                    <Select.Option value="Tiếng Pháp">Tiếng Pháp</Select.Option>
                    <Select.Option value="Tiếng Ý">Tiếng Ý</Select.Option>
                    <Select.Option value="Tiếng Hàn">Tiếng Hàn</Select.Option>
                    <Select.Option value="Tiếng Đức">Tiếng Đức</Select.Option>
                    <Select.Option value="Tiếng Tây Ban Nha">
                      Tiếng Tây Ban Nha
                    </Select.Option>
                  </Select>
                </div>

                <div>
                  <label className="font-semibold mb-1 block">Trình độ</label>
                  <Select
                    value={selectedLevel || undefined}
                    onChange={(value) => setSelectedLevel(value)}
                    placeholder="Chọn trình độ"
                    className="w-full"
                    size="large"
                  >
                    <Select.Option value="Sơ cấp">Sơ cấp</Select.Option>
                    <Select.Option value="Trung cấp">Trung cấp</Select.Option>
                    <Select.Option value="Nâng cao">Nâng cao</Select.Option>
                    <Select.Option value="Thành thạo">Thành thạo</Select.Option>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition font-medium"
              >
                + Thêm ngôn ngữ
              </button>

              {languages.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">
                    Ngôn ngữ đã chọn ({languages.length}):
                  </p>
                  <div className="flex flex-wrap gap-3">
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
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div className="flex justify-end px-8 py-2 border-t border-gray-300 gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={async () => {
                  const formData = new FormData();
                  formData.append(
                    "foreignLanguages",
                    JSON.stringify(languages)
                  );

                  const success = await updatedProfileData?.(formData);
                  if (success) {
                    message.success("Cập nhật ngoại ngữ thành công!");
                    setTimeout(() => window.location.reload(), 500);
                  }
                }}
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
