import {
  LuBell,
  LuBriefcase,
  LuHand,
  LuLayoutDashboard,
  LuSettings,
} from "react-icons/lu";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const AccountLayout = () => {
  const user = useSelector((state) => state.user.user);

  const baseClass =
    "p-3 text-4 flex items-center gap-2 rounded-sm transition-all";
  const hoverClass =
    "hover:bg-emerald-50 hover:text-teal-700 hover:font-medium";
  const activeClass = "bg-emerald-50 text-teal-700 font-medium";

  return (
    <div className="flex mx-auto min-h-screen w-[1400px] px-[30px] mt-5">
      <div className="fixed top-21 left-1/2 -translate-x-[700px]">
        <div className="px-2 pt-6 pb-5 rounded-md shadow-sm w-70 h-74 bg-white border border-gray-200">
          <div className="mx-3 mb-2">
            <p className="flex items-center gap-2">
              <LuHand size={20} className="text-red-500" />
              <span className="text-sm">Xin chào</span>
            </p>
            <p className="text-[22px] font-semibold">{user?.fullName}</p>
          </div>

          <div className="menu-item">
            <ul className="flex flex-col">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
                }
                end
              >
                <LuLayoutDashboard size={16} />
                <p>Tổng quan</p>
              </NavLink>

              <NavLink
                to="/dashboard/my-jobs"
                className={({ isActive }) =>
                  `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
                }
              >
                <LuBriefcase size={16} />
                <p>Việc làm của tôi</p>
              </NavLink>

              <NavLink
                to="/dashboard/notifications"
                className={({ isActive }) =>
                  `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
                }
              >
                <LuBell size={16} />
                <p>Thông báo</p>
              </NavLink>

              <NavLink
                to="/dashboard/setting"
                className={({ isActive }) =>
                  `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
                }
              >
                <LuSettings size={16} />
                <p>Cài đặt</p>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

      <div className="pl-[260px] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
