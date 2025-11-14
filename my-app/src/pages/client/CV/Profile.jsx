import { MdOutlineEmail } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi2";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
// import { FiUser } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import avatar from "../../../assets/image/avatar.jpg";
import { FiUser } from "react-icons/fi";

const Profile = ({data = {} }) => {
  
  return (
    <div className="h-auto bg-[#383d44] flex text-white p-6 w-full gap-6">
      {/* Avatar */}
      <img src={avatar} alt="avatar" className="w-40 h-40 rounded-full object-cover" />

      {/* Thông tin cá nhân */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold py-2">{data.name}</h1>

        <div className="grid grid-cols-2 gap-4 text-xs mt-4">
          {/* Email */}
          <div className="flex items-center gap-2">
            <MdOutlineEmail className="w-5 h-5" />
            {data.email && data.email.trim() !== "" ? (
              data.email
            ) : (
              <p className="text-gray-500 italic">Email</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div className="flex items-center gap-2">
            <HiOutlinePhone className="w-5 h-5" />
            {data.phone && data.phone.trim() !== "" ? (
              data.phone
            ) : (
              <p className="text-gray-500 italic">Số điện thoại</p>
            )}
          </div>

          {/* Ngày sinh */}
          <div className="flex items-center gap-2">
            <LiaBirthdayCakeSolid className="w-5 h-5" />
            <span dir="auto" className="align-middle whitespace-pre-line pl-2">
              {data.birthday && data.birthday.trim() !== "" ? (
                data.birthday
              ) : (
                <p className="text-gray-500 italic">Ngày sinh</p>
              )}
            </span>
          </div>

          {/* Giới tính */}
          <div className="flex items-center gap-2">
            <FiUser className="w-5 h-5" />
            {data.gender && data.gender.trim() !== "" ? (
              data.gender
            ) : (
              <p className="text-gray-500 italic">Giới tính</p>
            )}
          </div>

          {/* Địa chỉ */}
          <div className="flex items-center gap-2">
            <CiLocationOn className="w-5 h-5" />
            {data.address && data.address.trim() !== "" ? (
              data.address
            ) : (
              <p className="text-gray-500 italic">Địa chỉ</p>
            )}
          </div>

          {/* Liên kết cá nhân */}
          <div className="flex items-center gap-2">
            <TbWorld className="w-5 h-5" />
            {data.personalLink && data.personalLink.trim() !== "" ? (
              data.personalLink
            ) : (
              <p className="text-gray-500 italic">Liên hệ cá nhân</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
