import { message } from "antd";
import { useEffect, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";

const Education = ({ cvData: educationData, updatedCvData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState({});
  useEffect(() => {
    const firstCv = educationData?.[0];
    const firstEdu = firstCv?.education?.[0] || {};

    setUser({
      school: firstEdu.school || "",
      degree: firstEdu.degree || "",
      from: firstEdu.from || "",
      to: firstEdu.to || "",
    });
  }, [educationData]);

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

    const hasEmpty = Object.entries(updatedData).some(([key, val]) => {
      if (isStudying && key === "to") return false;
      return val.trim() === "";
    });

    if (hasEmpty) {
      setError("⚠️ Bạn phải điền đầy đủ tất cả các thông tin trước khi lưu!");
      return;
    }

    const formData = new FormData();
    formData.append("education", JSON.stringify([updatedData]));

    setError("");
    const success = await updatedCvData?.(formData);
    if (success) {
      setUser(updatedData);
      message.success("Cập nhật học vấn thành công!");
      setIsOpen(false);
    }
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative ">
      <div className="w-full h-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[22px] font-bold">Học vấn</h1>

          <button onClick={handleOpenDialog}>
            <LuCirclePlus className="size-4 text-red-600 hover:scale-110 transition-transform" />
          </button>
        </div>

        {user.school && user.school.trim() !== "" && (
          <hr className="mt-4 mb-3 bg-gray-300 text-gray-300" />
        )}

        <div className="align-middle mt-2">
          {!user.school || user.school.trim() === "" ? (
            <p className="text-gray-500">
              Thông tin học vấn sẽ hiển thị tại đây
            </p>
          ) : (
            <>
              <h1 className="font-bold text-lg pb-1">{user.school}</h1>

              <h1>{user.degree}</h1>

              <h1>
                {user.from} - {user.to}
              </h1>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-250 h-auto text-left">
            <h1 className="text-[22px] font-semibold px-8 py-4 border-b border-gray-300">
              Học vấn
            </h1>

            <div className="px-8 py-6">
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="font-semibold mb-1 block">Trường</label>
                  <input
                    name="school"
                    value={tempData.school}
                    onChange={handleChange}
                    placeholder="Trường"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold mb-1 block">Ngành học</label>
                  <input
                    name="degree"
                    value={tempData.degree}
                    onChange={handleChange}
                    placeholder="Ngành"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isStudying"
                    checked={isStudying}
                    onChange={handleCheckboxChange}
                    className="size-4 accent-teal-600"
                  />
                  <label htmlFor="isStudying" className="text-gray-700">
                    Tôi đang theo học ở đây
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold mb-1 block">Ừ</label>
                    <input
                      name="from"
                      value={tempData.from}
                      onChange={handleChange}
                      placeholder="Tháng/Năm (VD: 11/2024)"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold mb-1 block">Đến</label>
                    <input
                      name="to"
                      value={isStudying ? "Hiện tại" : tempData.to}
                      onChange={handleChange}
                      placeholder="Tháng/Năm (VD: 11/2025)"
                      disabled={isStudying}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
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

export default Education;
