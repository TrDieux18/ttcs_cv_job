import { MdOutlineEmail } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi2";
import { LiaBirthdayCakeSolid, LiaEdit } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { CiLocationOn, CiCamera } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { TfiTrash } from "react-icons/tfi";

const Profile = () =>{
    return (
        <div className="h-auto bg-[#383d44] flex text-white p-6 w-full">
        <img
          src="https://khoinguonsangtao.vn/wp-content/uploads/2022/10/hinh-anh-trai-xau-nhat.jpg"
          alt="avatar"
          className="w-40 h-40 p-3"
        />
        <div className="w-full">
          <h1 className="text-3xl font-bold py-2">Trần Bình</h1>
          <div className="grid grid-cols-2 gap-4 p-6 text-xs">
            <div className="flexd flex-col">
              <div className="flex items-center">
                <MdOutlineEmail className="size-4" />
                <p className="flexd flex-col align-items-center pl-1">Email</p>
              </div>
            </div>
            <div className="flexd flex-col">
              <div className="flex items-center">
                <HiOutlinePhone className="size-4" />
                <p className="flexd flex-col align-items-center  pl-1">
                  Số điện thoại
                </p>
              </div>
            </div>
            <div className="flexd flex-col">
              <div className="flex items-center">
                <LiaBirthdayCakeSolid className="size-4" />
                <p className="flexd flex-col align-items-center  pl-1">
                  Ngày sinh
                </p>
              </div>
            </div>
            <div className="flexd flex-col">
              <div className="flex items-center">
                <FiUser className="size-4" />
                <p className="flexd flex-col align-items-center  pl-1">
                  Giới tính
                </p>
              </div>
            </div>
            <div className="flexd flex-col">
              <div className="flex items-center">
                <CiLocationOn className="size-4" />
                <p className="flexd flex-col align-items-center  pl-1">
                  Địa chỉ
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <TbWorld className="size-4" />
                <p className="flex align-items-center  pl-1">
                  Liên kết cá nhân
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Profile;