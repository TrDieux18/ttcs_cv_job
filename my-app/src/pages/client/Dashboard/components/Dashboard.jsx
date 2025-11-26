import { useEffect, useState } from "react";
import { getCvByUserId } from "@services/client/CvService";
import {
  LuBriefcase,
  LuExternalLink,
  LuFileText,
  LuMail,
} from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { getCountApplicationsByUserId } from "@services/client/ApplicationService";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cv, setCV] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [countAppliedJobs, setCountAppliedJobs] = useState(0);
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const [response, response_2] = await Promise.all([
          getCvByUserId(),
          getCountApplicationsByUserId(),
        ]);
        if (response.success) {
          setCV(response.data[0]);
          setFileUrl(response.data[0]?.fileUrl || "");
        }
        if (response_2.success) {
          setCountAppliedJobs(response_2.data);
        }
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };
    fetchCV();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="px-5 py-6 mb-5 rounded-md bg-white shadow-sm flex">
        <div className="mr-4">
          <img
            src={cv?.userId?.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-semibold">{cv?.userId?.fullName}</h2>
          <p className="flex gap-2 items-center text-[16px]">
            <LuBriefcase size={18} className="text-gray-400" />
            <span>{cv?.title}</span>
          </p>
          <p className="flex gap-2 items-center text-[16px]">
            <LuMail size={18} className="text-gray-400" />
            <span>{cv?.userId?.email}</span>
          </p>
          <NavLink
            to={"/templates"}
            className="flex gap-2 items-center text-blue-500 text-[16px]"
          >
            <span>Cập nhật hồ sơ</span>
            <RiArrowRightSLine size={18} />
          </NavLink>
        </div>
      </div>
      <div className="px-5 py-6 mb-5 rounded-md bg-white shadow-sm">
        <h2 className="text-[22px] font-semibold mb-4">Hồ sơ đính kèm</h2>
        <div className="align-middle mt-2">
          {!fileUrl ? (
            <p className="text-gray-500">Chưa có CV được upload</p>
          ) : (
            <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md">
              <div className="flex items-center gap-3">
                <LuFileText className="size-6 text-teal-600" />
                <div className="flex flex-col">
                  <p className="font-semibold">CV của bạn</p>
                  <div className="flex gap-4 text-sm">
                    <a
                      className="text-blue-600 hover:underline flex items-center gap-1"
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem file gốc <LuExternalLink className="size-3" />
                    </a>
                    <Link to="/cv" className="text-teal-600 hover:underline">
                      Xem CV template
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 py-6 mb-5 rounded-md bg-white shadow-sm">
        <h2 className="text-[22px] font-semibold mb-4 ">Hoạt động gần đây</h2>
        <div
          onClick={() => navigate("/dashboard/my-jobs")}
          className="flex gap-4 items-center"
        >
          <div className="w-80 h-28 bg-[#EBF0F9] p-2 rounded-sm hover:outline outline-blue-600">
            <p>Việc làm đã ứng tuyển</p>
            <span className="text-[36px] text-blue-700 font-bold">
              {countAppliedJobs || 0}
            </span>
          </div>
          <div
            onClick={() => navigate("/dashboard/my-jobs")}
            className="w-80 h-28 p-2 rounded-sm bg-[#FDF5F5] hover:outline hover:outline-red-600"
          >
            <p>Việc làm đã lưu</p>
            <span className="text-[36px] text-red-700 font-bold">
              {savedJobs.length || 0}
            </span>
          </div>
          <div
            onClick={() => navigate("/dashboard/my-jobs")}
            className="w-80 h-28 p-2 rounded-sm bg-[#EDF8EA] hover:outline hover:outline-green-600"
          >
            <p>Công ty theo dõi</p>
            <span className="text-[36px] text-green-700 font-bold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
