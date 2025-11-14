import { Input } from "antd";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi2";
import { LiaBirthdayCakeSolid, LiaEdit } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { CiLocationOn, CiCamera } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { TfiTrash } from "react-icons/tfi";
import { useState } from "react";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Dữ liệu người dùng hiện tại
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "0123456789",
    birthday: "01/01/1990",
    gender: "Nam",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    personalLink: "https://facebook.com/vana",
  });

  // Dữ liệu tạm khi người dùng sửa trong dialog
  const [tempData, setTempData] = useState(user);

  const handleOpenDialog = () => {
    setTempData(user);
    setIsOpen(true);
  };

  // Cập nhật giá trị khi người dùng nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu giá trị mới
  const handleSave = () => {
    setUser(tempData);
    setIsOpen(false);
    console.log("Dữ liệu đã lưu:", tempData);
  };

  return (
    <div className="">
      <div className="w-200 h-auto bg-white rounded-lg opacity-100 shadow-sm relative m-3">
        <div className="flex">
          <img
            src="https://res.cloudinary.com/dfreegzd9/image/upload/v1761562061/users/qauy8lokwakbzpm7l74g.jpg"
            alt="avatar"
            className="w-30 h-30 p-3 rounded-full object-cover"
          />
          <h1 className="text-3xl font-bold text-center py-10">{user.name}</h1>
          <button
            className="absolute right-2 top-2"
            onClick={() => setIsOpen(true)}
          >
            <LiaEdit className="size-10 text-red-600" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="flex">
            <MdOutlineEmail className="size-6 text-gray-600" />
            <span dir="auto" className="align-middle whitespace-pre-line pl-2">
              {user.email && user.email.trim() !== "" ? (
                user.email
              ) : (
                <p className="text-gray-500 italic">Email</p>
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <HiOutlinePhone className="size-6 text-gray-600" />
              <span
                dir="auto"
                className="align-middle whitespace-pre-line pl-2"
              >
                {user.phone && user.phone.trim() !== "" ? (
                  user.phone
                ) : (
                  <p className="text-gray-500 italic">Số điện thoại</p>
                )}
              </span>
            </div>
          </div>
          <div className="flexd flex-col">
            <div className="flex items-center">
              <LiaBirthdayCakeSolid className="size-6 text-gray-600" />
              <span
                dir="auto"
                className="align-middle whitespace-pre-line pl-2"
              >
                {user.birthday && user.birthday.trim() !== "" ? (
                  user.birthday
                ) : (
                  <p className="text-gray-500 italic">Ngày sinh</p>
                )}
              </span>
            </div>
          </div>
          <div className="flexd flex-col">
            <div className="flex items-center">
              <FiUser className="size-6 text-gray-600" />
              <span
                dir="auto"
                className="align-middle whitespace-pre-line pl-2"
              >
                {user.gender && user.gender.trim() !== "" ? (
                  user.gender
                ) : (
                  <p className="text-gray-500 italic">Giới tính</p>
                )}
              </span>
            </div>
          </div>
          <div className="flexd flex-col">
            <div className="flex items-center">
              <CiLocationOn className="size-6 text-gray-600" />
              <span
                dir="auto"
                className="align-middle whitespace-pre-line pl-2"
              >
                {user.address && user.address.trim() !== "" ? (
                  user.address
                ) : (
                  <p className="text-gray-500 italic">Địa chỉ</p>
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <TbWorld className="size-6 text-gray-600" />
              <span
                dir="auto"
                className="align-middle whitespace-pre-line pl-2"
              >
                {user.personalLink && user.personalLink.trim() !== "" ? (
                  user.personalLink
                ) : (
                  <p className="text-gray-500 italic">Liên hệ cá nhân</p>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6  shadow-lg text-center w-250 h-auto">
            <h1 className="text-4xl font-semibold mb-4">Thông tin cá nhân</h1>
            <div className="flex">
              <div className="w-70 items-center flex flex-col">
                <img
                  src="https://khoinguonsangtao.vn/wp-content/uploads/2022/10/hinh-anh-trai-xau-nhat.jpg"
                  alt="avatar"
                  className="w-45 h-45 p-6 rounded-full object-cover"
                />
                <div className="grid grid-cols-2 gap-4 flex justify-around">
                  <button className="px-4 py-2 text-[#ed1b2f]  transition  flex items-center">
                    <CiCamera className="text-lg " />
                    biên tập
                  </button>
                  <button className="px-4 py-2 text-black transition flex items-center">
                    <TfiTrash className="text-lg" />
                    Xóa bỏ
                  </button>
                </div>
              </div>
              <div className=" gap-4 mb-4 w-200 grid grid-cols-1">
                <Input
                  type="text"
                  name="name"
                  value={tempData.name}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  prefix={<FiUser />}
                  className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="email"
                    value={tempData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    prefix={<MdOutlineEmail />}
                    className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                  />
                  <Input
                    type="text"
                    name="phone"
                    value={tempData.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    prefix={<HiOutlinePhone />}
                    className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                  />
                  <Input
                    type="text"
                    name="birthday"
                    value={tempData.birthday}
                    onChange={handleChange}
                    placeholder="Ngày sinh"
                    prefix={<LiaBirthdayCakeSolid />}
                    className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                  />
                  <Input
                    type="text"
                    name="gender"
                    value={tempData.gender}
                    onChange={handleChange}
                    placeholder="Giới tính"
                    prefix={<FiUser />}
                    className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                  />
                  <Input
                    type="text"
                    name="address"
                    value={tempData.address}
                    onChange={handleChange}
                    placeholder="Địa chỉ"
                    prefix={<CiLocationOn />}
                    className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                  />
                  <Input
                    type="text"
                    name="personalLink"
                    value={tempData.personalLink}
                    onChange={handleChange}
                    placeholder="Liên kết cá nhân"
                    prefix={<TbWorld />}
                    className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                  />
                </div>
              </div>
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

export default Profile;
