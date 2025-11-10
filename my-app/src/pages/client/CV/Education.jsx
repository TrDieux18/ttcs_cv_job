import { useState } from "react";

const Education = () => {
  const [user, setUser] = useState({
    Truong: "Đại học vũ trụ",
    Trinh_Do: "Cử nhân",
    Nganh: "Công nghệ thông tin",
    thangnhap: "11",
    namnhap: "2024",
    thangcuoi: "11",
    namcuoi: "2025",
    thongTinKhac: "Đang học tốt",
  });

  const [isStudying, setIsStudying] = useState(false);

  // Nếu CÓ ÍT NHẤT 1 trường trống => ẩn
  const hasEmptyField = Object.values(user).some((val) => val.trim() === "");

  return (
    <div>
      {!hasEmptyField ? (
        <div className="flex">
          <div className="p-5 whitespace-nowrap font-bold">Học vấn</div>
          <div className="text-truncated ims-2 text-gray-600 text-sm p-5">
            <h1 className="font-bold">{user.Truong}</h1>
            <h1>
              {user.Trinh_Do} - {user.Nganh}
            </h1>
            <h1>
              {user.thangnhap}/{user.namnhap} -{" "}
              {isStudying || user.thangcuoi === "Hiện tại"
                ? "Hiện tại"
                : `${user.thangcuoi}/${user.namcuoi}`}
            </h1>
            <h1 className="pt-2">{user.thongTinKhac}</h1>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Education;
