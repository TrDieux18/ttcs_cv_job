import { message } from "antd";
import { useEffect, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";

const WorkExperience = ({ cvData: experience, updatedCvData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    const firstCv = experience?.[0];
    const firstExp = firstCv?.experience?.[0] || {};

    setUser({
      position: firstExp.position || "",
      company: firstExp.company || "",
      from: firstExp.from || "",
      to: firstExp.to || "",
      description: firstExp.description || "",
      project: firstExp.project || "",
    });
  }, [experience]);

  const [tempData, setTempData] = useState(user);

  const handleOpenDialog = () => {
    setTempData(user);
    setIsStudying(user.to === "Hiện tại");
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
      to: isStudying ? "Hiện tại" : tempData.to,
    };

    console.log("💼 WorkExperience state before save:", tempData);
    console.log("💼 WorkExperience updated data:", updatedData);
    console.log("💼 isStudying:", isStudying);

    const formData = new FormData();
    formData.append("experience", JSON.stringify([updatedData]));
    console.log("📤 FormData experience:", JSON.stringify([updatedData]));

    setError("");
    const success = await updatedCvData(formData);
    if (success) {
      setUser(updatedData);
      message.success("Cập nhật kinh nghiệm làm việc thành công!");
      setIsOpen(false);
    }
  };

  const isEmptyData =
    !user.position &&
    !user.company &&
    !user.from &&
    !user.to &&
    !user.description &&
    !user.project;

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative">
      <div className="w-full h-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[22px] font-bold">Kinh nghiệm làm việc</h1>
          <button onClick={() => handleOpenDialog()}>
            <LuCirclePlus className="size-4 text-red-600 hover:scale-110 transition-transform" />
          </button>
        </div>
        {user.position !== "" && (
          <hr className="mt-4 mb-3 bg-gray-300 text-gray-300" />
        )}

        <div className="mt-2">
          {isEmptyData ? (
            <p className="text-gray-500">
              Thể hiện những thông tin chi tiết về quá trình làm việc
            </p>
          ) : (
            <>
              <h1 className="font-bold text-lg pb-1">{user.position}</h1>
              <h1>{user.company}</h1>
              <h1>
                {user.from} - {user.to}
              </h1>

              {user.description && (
                <div className="mt-3">
                  <h2 className="font-semibold text-gray-800">Mô tả:</h2>
                  <p className="text-gray-700">{user.description}</p>
                </div>
              )}

              {user.project && (
                <div className="mt-3">
                  <h2 className="font-semibold text-gray-800">Dự án:</h2>
                  <p className="text-gray-700">{user.project}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-250 max-h-[90vh] overflow-y-auto text-left">
            <h1 className="text-[22px] font-semibold px-8 py-4 border-b border-gray-300">
              Kinh nghiệm làm việc
            </h1>

            <div className="px-8 py-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="font-semibold text-gray-700">Công ty</label>
                  <input
                    type="text"
                    name="company"
                    value={tempData.company}
                    onChange={handleChange}
                    placeholder="Nhập tên công ty"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Vị trí</label>
                  <input
                    type="text"
                    name="position"
                    value={tempData.position}
                    onChange={handleChange}
                    placeholder="Nhập vị trí"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isStudying"
                    checked={isStudying}
                    onChange={handleCheckboxChange}
                    className="size-4 accent-teal-500"
                  />
                  <label htmlFor="isStudying" className="text-gray-700">
                    Tôi đang làm việc tại đây
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-700">Từ</label>
                    <input
                      type="text"
                      name="from"
                      value={tempData.from}
                      onChange={handleChange}
                      placeholder="Nhập thời gian bắt đầu"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">Đến</label>
                    <input
                      type="text"
                      name="to"
                      value={isStudying ? "Hiện tại" : tempData.to}
                      onChange={handleChange}
                      placeholder="Nhập thời gian kết thúc"
                      disabled={isStudying}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Mô tả công việc
                  </label>
                  <textarea
                    name="description"
                    value={tempData.description}
                    onChange={handleChange}
                    placeholder="Nhập mô tả công việc"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Dự án tham gia
                  </label>
                  <textarea
                    name="project"
                    value={tempData.project}
                    onChange={handleChange}
                    placeholder="Nhập dự án đã tham gia"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                  />
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
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

export default WorkExperience;
