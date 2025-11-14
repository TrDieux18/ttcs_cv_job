import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Input } from "antd";

const Education = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    Truong: "Đại học Vũ trụ",
    Trinh_Do: "Cử nhân",
    Nganh: "Công nghệ thông tin",
    thangnhap: "11",
    namnhap: "2024",
    thangcuoi: "11",
    namcuoi: "2025",
    thongTinKhac: "Đang học tốt",
  });

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

    // Kiểm tra thiếu
    const hasEmpty = Object.entries(updatedData).some(([key, val]) => {
      if (isStudying && (key === "thangcuoi" || key === "namcuoi")) return false;
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

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative m-3">
      <div className="flex p-3">
        <h1 className="text-3xl font-bold text-center py-5">Học vấn</h1>
        <button className="absolute right-2 top-2" onClick={handleOpenDialog}>
          <CiCirclePlus className="size-10 text-red-600" />
        </button>
      </div>
      <hr />

      <div className="p-3">
        <h1 className="font-bold text-xl pb-3">{user.Truong}</h1>
        <h1>
          {user.Trinh_Do} - {user.Nganh}
        </h1>
        <h1>
          {user.thangnhap}/{user.namnhap} -{" "}
          {user.thangcuoi === "Hiện tại"
            ? "Hiện tại"
            : `${user.thangcuoi}/${user.namcuoi}`}
        </h1>
        <h1 className="pt-3">{user.thongTinKhac}</h1>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-250 h-auto">
            <h1 className="text-4xl font-semibold mb-4 text-center">Học vấn</h1>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <Input name="Truong" value={tempData.Truong} onChange={handleChange} placeholder="Trường" />
              <div className="grid grid-cols-2 gap-4">
                <Input name="Trinh_Do" value={tempData.Trinh_Do} onChange={handleChange} placeholder="Trình độ" />
                <Input name="Nganh" value={tempData.Nganh} onChange={handleChange} placeholder="Ngành" />
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
                  Tôi đang theo học ở đây
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h1 className="font-semibold">Từ</h1>
                  <div className="flex gap-x-4">
                    <Input name="thangnhap" value={tempData.thangnhap} onChange={handleChange} placeholder="Tháng" />
                    <Input name="namnhap" value={tempData.namnhap} onChange={handleChange} placeholder="Năm" />
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold">Đến</h1>
                  <div className="flex gap-x-4">
                    <Input
                      name="thangcuoi"
                      value={isStudying ? "Hiện tại" : tempData.thangcuoi}
                      onChange={handleChange}
                      placeholder="Tháng"
                      disabled={isStudying}
                    />
                    <Input
                      name="namcuoi"
                      value={isStudying ? "" : tempData.namcuoi}
                      onChange={handleChange}
                      placeholder="Năm"
                      disabled={isStudying}
                    />
                  </div>
                </div>
              </div>

              <Input name="thongTinKhac" value={tempData.thongTinKhac} onChange={handleChange} placeholder="Thông tin khác" />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
                Hủy bỏ
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
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
