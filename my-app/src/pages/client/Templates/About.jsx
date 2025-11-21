import { message } from "antd";
import { useState, useEffect } from "react";
import { LuCirclePlus } from "react-icons/lu";

const About = ({ profileData, updatedProfileData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [introduction, setIntroduction] = useState([]);

  useEffect(() => {
    setIntroduction(profileData?.introduction || []);
  }, [profileData]);

  const handleSave = async () => {
    if (!introduction || introduction.length === 0) {
      alert("Vui lòng nhập giới thiệu bản thân!");
      return;
    }

    const formData = new FormData();

    formData.append("introduction", JSON.stringify(introduction));

    const updated = await updatedProfileData?.(formData);
    if (updated) {
      message.success("Cập nhật giới thiệu bản thân thành công!");
      setIsOpen(false);
    }
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative">
      <div className="w-full h-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[22px] font-bold">Giới thiệu bản thân</h1>
          <button onClick={() => setIsOpen(true)}>
            <LuCirclePlus size={16} className="text-red-600" />
          </button>
        </div>

        {introduction.length > 0 && (
          <hr className="mt-4 mb-3 border-gray-300" />
        )}

        <div className="align-middle mt-2 whitespace-pre-line">
          {introduction.length > 0 ? (
            introduction.map((line, index) => (
              <p key={index} className={index === 0 ? "mt-0" : "mt-2"}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-500">
              Thể hiện những thông tin chi tiết về quá trình làm việc
            </p>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-250 h-auto text-left">
            <h1 className="text-[22px] font-semibold px-8 py-4 border-b border-gray-300">
              Giới thiệu bản thân
            </h1>

            <div className="px-8 py-6">
              <label className="font-semibold mb-1 block">
                Giới thiệu bản thân
              </label>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-bold text-orange-300">Tip: </span>
                Tóm tắt kinh nghiệm chuyên môn, chú ý làm nổi bật các kỹ năng và
                điểm mạnh.
              </p>

              <textarea
                id="introduction"
                value={introduction.join("\n")}
                onChange={(e) => setIntroduction(e.target.value.split(/\r?\n/))}
                placeholder="Nhập mô tả, nhấn Enter để xuống dòng..."
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
              />

              <p className="text-gray-500 mt-2">{introduction.length} dòng</p>
            </div>

            <div className="flex justify-end px-8 py-2 border-t border-gray-300 gap-4">
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
