import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Input } from "antd";

const WorkExperience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [error, setError] = useState("");

  // Dữ liệu người dùng hiện tại
  const [user, setUser] = useState({
    ChucDanh: "",
    TenCongTy: "",
    thangnhap: "",
    namnhap: "",
    thangcuoi: "",
    namcuoi: "",
    text_MoTa: "",
    text_DuAn: "",
  });

  // Dữ liệu tạm khi chỉnh sửa
  const [tempData, setTempData] = useState(user);

  const handleOpenDialog = () => {
    setTempData(user);
    setIsStudying(user.thangcuoi === "Hiện tại");
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setIsStudying(e.target.checked);
  };

  const handleSave = () => {
    const updatedData = {
      ...tempData,
      thangcuoi: isStudying ? "Hiện tại" : tempData.thangcuoi,
      namcuoi: isStudying ? "" : tempData.namcuoi,
    };
    const hasEmpty = Object.entries(updatedData).some(([key, val]) => {
      if (isStudying && (key === "thangcuoi" || key === "namcuoi"))
        return false;
      return val.trim() === "" && val !== "Hiện tại";
    });

    if (hasEmpty) {
      setError("⚠️ Bạn phải điền đầy đủ tất cả các thông tin trước khi lưu!");
      return;
    }

    setError("");
    setUser(updatedData);
    setIsOpen(false);
    console.log("Dữ liệu đã lưu:", updatedData);
  };

  // Kiểm tra xem dữ liệu có trống hay không
  const isEmptyData =
    !user.ChucDanh &&
    !user.TenCongTy &&
    !user.thangnhap &&
    !user.namnhap &&
    !user.text_MoTa &&
    !user.text_DuAn;

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative m-3">
      <div className="flex p-3">
        <h1 className="text-3xl font-bold py-5 flex-1">Kinh nghiệm làm việc</h1>
        <button className="absolute right-2 top-2" onClick={handleOpenDialog}>
          <CiCirclePlus className="size-10 text-red-600 hover:scale-110 transition-transform" />
        </button>
      </div>

      <hr />

      {/* Hiển thị thông tin */}
      <div className="p-3">
        {isEmptyData ? (
          <p className="text-gray-500 italic">
            Thể hiện những thông tin chi tiết về quá trình làm việc
          </p>
        ) : (
          <>
            <h1 className="font-bold text-xl pb-3">{user.ChucDanh}</h1>
            <h1>{user.TenCongTy}</h1>
            <h1>
              {user.thangnhap}/{user.namnhap} -{" "}
              {user.thangcuoi === "Hiện tại"
                ? "Hiện tại"
                : `${user.thangcuoi}/${user.namcuoi}`}
            </h1>

            {user.text_MoTa && (
              <div className="mt-4">
                <h2 className="font-semibold text-gray-800">Mô tả:</h2>
                <p className="text-gray-700">{user.text_MoTa}</p>
              </div>
            )}

            {user.text_DuAn && (
              <div className="mt-4">
                <h2 className="font-semibold text-gray-800">Dự án:</h2>
                <p className="text-gray-700">{user.text_DuAn}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Dialog chỉnh sửa */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-250px max-h-[90vh] overflow-y-auto">
            <h1 className="text-4xl font-semibold mb-4 text-center">
              Chỉnh sửa kinh nghiệm
            </h1>

            <div className="grid grid-cols-1 gap-4 mb-4">
              {/* Chức danh */}
              <Input
                type="text"
                name="ChucDanh"
                value={tempData.ChucDanh}
                onChange={handleChange}
                placeholder="Chức danh"
                className="h-12 text-lg rounded-md border border-gray-300 px-4"
              />

              {/* Tên công ty */}
              <Input
                type="text"
                name="TenCongTy"
                value={tempData.TenCongTy}
                onChange={handleChange}
                placeholder="Tên công ty"
                className="h-12 text-lg rounded-md border border-gray-300 px-4"
              />

              {/* Checkbox */}
              <div className="pt-4 pb-4 flex items-center gap-2">
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

              {/* Thời gian */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h1 className="font-semibold">Từ</h1>
                  <div className="flex gap-x-4">
                    <Input
                      type="text"
                      name="thangnhap"
                      value={tempData.thangnhap}
                      onChange={handleChange}
                      placeholder="Tháng"
                      className="h-12 text-lg rounded-md border border-gray-300 px-4"
                    />
                    <Input
                      type="text"
                      name="namnhap"
                      value={tempData.namnhap}
                      onChange={handleChange}
                      placeholder="Năm"
                      className="h-12 text-lg rounded-md border border-gray-300 px-4"
                    />
                  </div>
                </div>

                <div>
                  <h1 className="font-semibold">Đến</h1>
                  <div className="flex gap-x-4">
                    <Input
                      type="text"
                      name="thangcuoi"
                      value={isStudying ? "Hiện tại" : tempData.thangcuoi}
                      onChange={handleChange}
                      placeholder="Tháng"
                      disabled={isStudying}
                      className="h-12 text-lg rounded-md border border-gray-300 px-4 bg-gray-100"
                    />
                    <Input
                      type="text"
                      name="namcuoi"
                      value={isStudying ? "" : tempData.namcuoi}
                      onChange={handleChange}
                      placeholder="Năm"
                      disabled={isStudying}
                      className="h-12 text-lg rounded-md border border-gray-300 px-4 bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết */}
              <div className="mt-6">
                <h1 className="font-bold">Mô tả chi tiết</h1>
                <textarea
                  name="text_MoTa"
                  value={tempData.text_MoTa}
                  onChange={handleChange}
                  placeholder="Mô tả công việc, trách nhiệm, thành tựu..."
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                />
              </div>

              {/* Dự án */}
              <div className="mt-4">
                <h1 className="font-bold">Dự án tham gia</h1>
                <textarea
                  name="text_DuAn"
                  value={tempData.text_DuAn}
                  onChange={handleChange}
                  placeholder="Nhập mô tả dự án đã tham gia..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Nút hành động */}
            <div className="flex justify-center mt-4 space-x-4">
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
