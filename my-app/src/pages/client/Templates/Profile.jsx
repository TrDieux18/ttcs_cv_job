import { Input, message, Spin, Select } from "antd";
import { useState, useEffect } from "react";
import {
  LuMail,
  LuPhone,
  LuUser,
  LuMapPin,
  LuCamera,
  LuGlobe,
  LuTrash2,
  LuPencilLine,
  LuGift,
} from "react-icons/lu";
const Profile = ({ profileData: user, updatedProfileData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tempData, setTempData] = useState({});

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setTempData(user);
      setPreview(user.avatar);
    }
  }, [user]);

  const handleOpenDialog = () => {
    setTempData(user);
    setPreview(user.avatar);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(tempData).forEach(([key, value]) => {
        if (["avatar", "introduction"].includes(key)) return;
        if (value !== user[key]) formData.append(key, value);
      });

      const fileInput = document.getElementById("avatarInput");
      if (fileInput?.files?.[0]) {
        formData.append("avatar", fileInput.files[0]);
      } else if (tempData.avatar && tempData.avatar !== user.avatar) {
        formData.append("avatar", tempData.avatar);
      }

      formData.append(
        "introduction",
        JSON.stringify(tempData.introduction || [])
      );

      const updated = await updatedProfileData?.(formData);
      console.log("Updated:", updated);

      if (updated) {
        message.success("Cập nhật thông tin cá nhân thành công!");
        setIsOpen(false);

        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="w-200 h-auto bg-white rounded-lg opacity-100 shadow-sm relative mt-10 p-4">
        <div className="flex items-center mb-6">
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-25 h-25 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold pl-4 flex flex-col gap-4">
            <span>{user?.fullName || "Họ và tên"}</span>
            <span
              className={`${
                user?.jobTitle
                  ? "text-md text-gray-600"
                  : "text-md text-gray-400"
              }`}
            >
              {user?.jobTitle || "Cập nhật chức danh"}
            </span>
          </h1>
          <button className="absolute right-4 top-4" onClick={handleOpenDialog}>
            <LuPencilLine className="size-5 text-red-600" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 gap-x-6 ml-2">
          <div className="flex items-center">
            <LuMail className="size-4 text-gray-500" />
            <span
              dir="auto"
              className="align-middle text-md whitespace-pre-line pl-2"
            >
              {user?.email ? (
                user.email
              ) : (
                <p className="text-gray-500 ">Email</p>
              )}
            </span>
          </div>

          <div className="flex items-center">
            <LuPhone className="size-4 text-gray-500" />
            <span
              dir="auto"
              className="align-middle text-md whitespace-pre-line pl-2"
            >
              {user?.phoneNumber ? (
                user.phoneNumber
              ) : (
                <p className="text-gray-500 ">Số điện thoại</p>
              )}
            </span>
          </div>

          <div className="flex items-center">
            <LuGift className="size-4 text-gray-500" />
            <span
              dir="auto"
              className="align-middle text-md whitespace-pre-line pl-2"
            >
              {user?.dateOfBirth ? (
                user.dateOfBirth
              ) : (
                <p className="text-gray-500 ">Ngày sinh</p>
              )}
            </span>
          </div>

          <div className="flex items-center">
            <LuUser className="size-4 text-gray-500" />
            <span
              dir="auto"
              className="align-middle text-md whitespace-pre-line pl-2"
            >
              {user?.gender ? (
                user.gender === "female" ? (
                  "Nữ"
                ) : (
                  "Nam"
                )
              ) : (
                <p className="text-gray-500 ">Giới tính</p>
              )}
            </span>
          </div>

          <div className="flex items-center">
            <LuMapPin className="size-4 text-gray-500" />
            <span
              dir="auto"
              className="align-middle text-md whitespace-pre-line pl-2"
            >
              {user?.address ? (
                user.address
              ) : (
                <p className="text-gray-500 ">Địa chỉ</p>
              )}
            </span>
          </div>

          <div className="flex items-center">
            <LuGlobe className="size-4 text-gray-500" />
            <span
              dir="auto"
              className="align-middle text-md whitespace-pre-line pl-2"
            >
              {user?.socialLinks ? (
                user.socialLinks
              ) : (
                <p className="text-gray-500">Liên hệ cá nhân</p>
              )}
            </span>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Spin
            spinning={loading}
            style={{
              color: "teal",
            }}
          >
            <div className="bg-white rounded-md shadow-lg text-center w-250 h-auto">
              <h1 className="text-[22px] font-semibold mb-4 text-left px-8 py-4 border-b border-gray-300">
                Thông tin cá nhân
              </h1>
              <div className="flex px-8 py-4">
                <div className="w-70 text-center mx-auto">
                  <img
                    src={preview || "https://via.placeholder.com/150"}
                    alt="avatar"
                    className="w-40 h-40 p-4 rounded-full object-cover"
                  />
                  <div className="flex mr-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="avatarInput"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert("Kích thước ảnh không được vượt quá 5MB");
                            return;
                          }

                          if (!file.type.startsWith("image/")) {
                            alert("Chỉ chấp nhận file ảnh");
                            return;
                          }

                          const previewURL = URL.createObjectURL(file);
                          setPreview(previewURL);
                        }
                      }}
                    />
                    <button
                      className="px-4 py-2  text-black transition flex items-center gap-2"
                      onClick={() =>
                        document.getElementById("avatarInput")?.click()
                      }
                    >
                      <LuCamera className="text-lg " />
                      <span>Sửa</span>
                    </button>
                    <button
                      className="px-4 py-2 text-[#ed1b2f] transition flex items-center gap-2"
                      onClick={() => {
                        setPreview(null);
                        setTempData((prev) => ({ ...prev, avatar: null }));

                        const input = document.getElementById("avatarInput");
                        if (input) input.value = "";
                      }}
                    >
                      <LuTrash2 className="text-lg" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
                <div className=" gap-4 mb-4 w-200 grid grid-cols-1">
                  <div>
                    <label className="text-left font-semibold mb-1 block">
                      Họ và tên
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={tempData.fullName}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                      className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                      rules={[
                        { required: true, message: "Họ và tên là bắt buộc" },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="text-left font-semibold mb-1 block">
                      Chức vụ
                    </label>
                    <Input
                      type="text"
                      name="jobTitle"
                      value={tempData.jobTitle}
                      onChange={handleChange}
                      placeholder="Chức vụ"
                      className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                      rules={[
                        { required: true, message: "Chức vụ là bắt buộc" },
                      ]}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-left font-semibold mb-1 block">
                        Email
                      </label>
                      <Input
                        type="text"
                        name="email"
                        value={tempData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                        rules={[
                          { required: true, message: "Email là bắt buộc" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="text-left font-semibold mb-1 block">
                        Số điện thoại
                      </label>
                      <Input
                        type="text"
                        name="phoneNumber"
                        value={tempData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Số điện thoại"
                        className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                        rules={[
                          {
                            required: true,
                            message: "Số điện thoại là bắt buộc",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="text-left font-semibold mb-1 block">
                        Ngày sinh
                      </label>
                      <Input
                        type="text"
                        name="dateOfBirth"
                        value={tempData.dateOfBirth}
                        onChange={handleChange}
                        placeholder="Ngày sinh"
                        className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="text-left font-semibold mb-1 block">
                        Giới tính
                      </label>
                      <Select
                        value={tempData.gender || undefined}
                        onChange={(value) =>
                          setTempData((prev) => ({ ...prev, gender: value }))
                        }
                        placeholder="Giới tính"
                        className=" text-left w-full"
                        size="large"
                      >
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                      </Select>
                    </div>
                    <div>
                      <label className="text-left font-semibold mb-1 block">
                        Địa chỉ
                      </label>
                      <Input
                        type="text"
                        name="address"
                        value={tempData.address}
                        onChange={handleChange}
                        placeholder="Địa chỉ"
                        className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                        rules={[
                          { required: true, message: "Địa chỉ là bắt buộc" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="text-left font-semibold mb-1 block">
                        Liên kết cá nhân
                      </label>
                      <Input
                        type="text"
                        name="socialLinks"
                        value={tempData.socialLinks}
                        onChange={handleChange}
                        placeholder="Liên kết cá nhân"
                        className="w-80 h-12 text-lg rounded-md border border-gray-300 px-4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4 px-8 py-2 border-t border-gray-300 gap-4">
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
          </Spin>
        </div>
      )}
    </div>
  );
};

export default Profile;
