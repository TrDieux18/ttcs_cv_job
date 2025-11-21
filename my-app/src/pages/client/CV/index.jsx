import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import ProfileCV from "./Profile";
import AboutCV from "./About";
import EducationCV from "./Education";
import SkillsCV from "./Skills";
import WorkExperience from "./WorkExperience";
import ForeignLanguageCV from "./ForeignLanguage";
import HighlightProjectCV from "./HighlightProject";
import CertificatesCV from "./Certificates";
import AwardsCV from "./Awards";

const CV = () => {
  const cvRef = useRef(); // dùng ref để lấy div của CV
  // Dữ liệu Education
  const [educationData] = useState({
    Truong: "Đại học Bách Khoa",
    Trinh_Do: "Cử nhân",
    Nganh: "Công nghệ thông tin",
    thangnhap: "09",
    namnhap: "2018",
    thangcuoi: "06",
    namcuoi: "2022",
    thongTinKhac: "Học bổng toàn phần 2 năm liền",
  });

  // Dữ liệu Profile
  const [ProfileData] = useState({
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "0123456789",
    birthday: "01/01/1990",
    gender: "Nam",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    personalLink: "https://facebook.com/vana",
  });

  // Dữ liệu About
  const [AboutData] = useState({
    text: "Tôi là một lập trình viên nhiệt huyết, yêu thích công nghệ và luôn tìm cách cải thiện kỹ năng của mình. Tôi có kinh nghiệm trong phát triển web và ứng dụng di động, đồng thời đam mê học hỏi những công nghệ mới.",
  });

  // Dữ liệu Skills
  const [SkillData] = useState([
    { skill: "Tin học văn phòng", level: "Thành thạo" },
    { skill: "Giao tiếp", level: "Khá" },
    { skill: "Làm việc nhóm", level: "Trung bình" },
  ]);

  // Dữ liệu WorkExperience
  const [WorkExperienceData] = useState({
    ChucDanh: "Lập trình viên",
    TenCongTy: "Công ty ABC",
    thangnhap: "07",
    namnhap: "2022",
    thangcuoi: "12",
    namcuoi: "2024",
    text_MoTa: "Phát triển ứng dụng web và tối ưu hệ thống backend.",
    text_DuAn: "Dự án quản lý khách hàng, hệ thống bán hàng trực tuyến.",
  });

  // Dữ liệu Foreign Language
  const [LanguageData] = useState([
    { language: "Tiếng Anh", level: "Thành thạo" },
    { language: "Tiếng Nhật", level: "Khá" },
    { language: "Tiếng Pháp", level: "Trung bình" },
  ]);

  // Dữ liệu HighlightProject
  const [HighlightProjectData] = useState({
    TenDuAn: "Hệ thống quản lý bán hàng",
    thangnhap: "01",
    namnhap: "2023",
    thangcuoi: "06",
    namcuoi: "2023",
    text_MoTa: "Xây dựng hệ thống quản lý bán hàng với React và Node.js.",
    link: "http://localhost:2303/cv",
  });

  // Dữ liệu Certificates
  const [CertificatesData] = useState({
    TenChungChi: "Chứng chỉ Lập trình Web",
    ToChuc: "Coursera",
    thang: "05",
    nam: "2023",
    link: "http://localhost:2303/cv",
    text_MoTa:
      "Hoàn thành khóa học lập trình web đầy đủ từ cơ bản đến nâng cao.",
  });

  // Dữ liệu Awards
  const [AwardsData] = useState({
    TenGiaiThuong: "Giải thưởng Nhân viên xuất sắc",
    ToChuc: "Công ty ABC",
    thang: "12",
    nam: "2023",
    text_MoTa:
      "Được công nhận là nhân viên xuất sắc với nhiều đóng góp cho dự án.",
  });

  const handleDownload = () => {
    const element = cvRef.current;
    const options = {
      margin: [0, 0, 0, 0],
      filename: "CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf().set(options).from(element).save();
  };
  return (
    <div className="w-full min-h-screen bg-gray-300 p-6 flex flex-col items-center">
      {/* Nội dung CV */}
      <div
        className="bg-white border shadow-lg"
        ref={cvRef}
        style={{
          width: "210mm",
          height: "297mm",
          padding: "0",
          boxSizing: "border-box",
          overflow: "hidden",
          backgroundColor: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <ProfileCV data={ProfileData} />
        <AboutCV data={AboutData} />
        <EducationCV data={educationData} />
        <SkillsCV data={SkillData} />
        <WorkExperience data={WorkExperienceData} />
        <ForeignLanguageCV data={LanguageData} />
        <HighlightProjectCV data={HighlightProjectData} />
        <CertificatesCV data={CertificatesData} />
        <AwardsCV data={AwardsData} />
      </div>

      {/* Nút tải PDF */}
      <div className="pt-5">
        <button
          onClick={handleDownload}
          className="border rounded-lg w-[794px] h-10 bg-[rgb(237,27,47)] text-white font-bold"
        >
          Tải CV
        </button>
      </div>
    </div>
  );
};

export default CV;
