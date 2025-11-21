import { message } from "antd";
import { useState, useEffect } from "react";
import { LuCirclePlus, LuExternalLink } from "react-icons/lu";

const HighlightProject = ({ cvData, updatedCvData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    name: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
    link: "",
  });

  // Load project from cvData
  useEffect(() => {
    const firstCv = cvData?.[0];
    const firstProject = firstCv?.projects?.[0] || {};

    setUser({
      name: firstProject.name || "",
      startMonth: firstProject.startMonth || "",
      startYear: firstProject.startYear || "",
      endMonth: firstProject.endMonth || "",
      endYear: firstProject.endYear || "",
      description: firstProject.description || "",
      link: firstProject.link || "",
    });
  }, [cvData]);

  const [tempData, setTempData] = useState(user);

  const handleOpenDialog = () => {
    setTempData(user);
    setIsStudying(user.endMonth === "Hiện tại");
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setIsStudying(e.target.checked);
  };

  const handleSave = async () => {
    const updatedData = {
      ...tempData,
      endMonth: isStudying ? "Hiện tại" : tempData.endMonth,
      endYear: isStudying ? "" : tempData.endYear,
    };

    console.log("🚀 Project tempData:", tempData);
    console.log("🚀 Project isStudying:", isStudying);
    console.log("🚀 Project updatedData:", updatedData);

    const hasEmpty = Object.entries(updatedData).some(([key, val]) => {
      if (isStudying && (key === "endMonth" || key === "endYear")) return false;
      if (typeof val === "string") {
        return val.trim() === "" && val !== "Hiện tại";
      }
      return !val; 
    });

    if (hasEmpty) {
      setError("⚠️ Bạn phải điền đầy đủ tất cả các thông tin trước khi lưu!");
      return;
    }

    const formData = new FormData();
    formData.append("projects", JSON.stringify([updatedData]));
    console.log("📤 FormData projects string:", JSON.stringify([updatedData]));

    const success = await updatedCvData?.(formData);
    if (success) {
      setError("");
      setUser(updatedData);
      message.success("Cập nhật dự án nổi bật thành công!");
      setIsOpen(false);
    }
  };
  const isEmptyData =
    !user.name &&
    !user.startMonth &&
    !user.startYear &&
    !user.description &&
    !user.link;

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative ">
      <div className="w-full h-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[22px] font-bold">Dự án nổi bật</h1>

          <button onClick={handleOpenDialog}>
            <LuCirclePlus className="size-4 text-red-600 hover:scale-110 transition-transform" />
          </button>
        </div>

        {!isEmptyData && <hr className="mt-4 mb-3 border-gray-300" />}

        <div className="align-middle mt-2 text-lg">
          {isEmptyData ? (
            <p className="text-gray-500 text-[16px]">
              Giới thiệu dự án nổi bật của bạn
            </p>
          ) : (
            <>
              <h1 className="font-bold text-lg pb-1">{user.name}</h1>

              <h1>
                {user.startMonth}/{user.startYear} -{" "}
                {user.endMonth === "Hiện tại"
                  ? "Hiện tại"
                  : `${user.endMonth}/${user.endYear}`}
              </h1>

              {user.description && (
                <div className="mt-4">
                  <h2 className="font-semibold text-gray-800">Mô tả:</h2>
                  <p className="text-gray-700">{user.description}</p>
                </div>
              )}

              {user.link && (
                <a
                  href={user.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1 mt-3"
                >
                  Xem dự án <LuExternalLink className="size-5" />
                </a>
              )}
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-250 max-h-[90vh] overflow-y-auto text-left">
            <h1 className="text-[22px] font-semibold px-8 py-4 border-b border-gray-300">
              Dự án nổi bật
            </h1>

            <div className="px-8 py-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="font-semibold mb-1 block">Tên dự án</label>
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleChange}
                    placeholder="Tên dự án"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="pt-4 pb-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isStudying"
                    checked={isStudying}
                    onChange={handleCheckboxChange}
                    className="size-4 accent-teal-500"
                  />
                  <label htmlFor="isStudying" className="text-gray-700">
                    Tôi vẫn đang làm dự án này
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold mb-1 block">
                      Ngày bắt đầu
                    </label>
                    <div className="flex gap-x-4">
                      <input
                        type="text"
                        name="startMonth"
                        value={tempData.startMonth}
                        onChange={handleChange}
                        placeholder="Tháng"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        name="startYear"
                        value={tempData.startYear}
                        onChange={handleChange}
                        placeholder="Năm"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold mb-1 block">
                      Ngày kết thúc
                    </label>
                    <div className="flex gap-x-4">
                      <input
                        type="text"
                        name="endMonth"
                        value={isStudying ? "Hiện tại" : tempData.endMonth}
                        onChange={handleChange}
                        placeholder="Tháng"
                        disabled={isStudying}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:bg-gray-100"
                      />
                      <input
                        type="text"
                        name="endYear"
                        value={isStudying ? "" : tempData.endYear}
                        onChange={handleChange}
                        placeholder="Năm"
                        disabled={isStudying}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="font-semibold mb-1 block">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    name="description"
                    value={tempData.description}
                    onChange={handleChange}
                    placeholder="Mô tả công việc, trách nhiệm, thành tựu..."
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="gap-4 mb-4">
                  <label className="font-semibold mb-1 block">Link dự án</label>
                  <input
                    type="text"
                    value={tempData.link}
                    name="link"
                    onChange={handleChange}
                    placeholder="Đường dẫn website"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

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
                onClick={handleSave}
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
export default HighlightProject;
