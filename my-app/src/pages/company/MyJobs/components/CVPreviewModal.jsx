import { Modal, Descriptions, Tag, Divider, Empty, Spin } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TrophyOutlined,
  BookOutlined,
  BulbOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const CVPreviewModal = ({ visible, onClose, applicant, loading }) => {
  if (!applicant && !loading) {
    return (
      <Modal
        title="Thông tin ứng viên"
        open={visible}
        onCancel={onClose}
        footer={null}
        width={800}
        centered
      >
        <Empty description="Không có thông tin ứng viên" />
      </Modal>
    );
  }

  const user = applicant?.user || {};
  const cv = applicant?.cv || {};

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <UserOutlined className="text-green-600" />
          <span className="text-lg font-semibold">Hồ sơ ứng viên</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-100">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <UserOutlined className="text-4xl text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {user.fullName || "Chưa cập nhật"}
                </h2>
                <p className="text-gray-600 font-medium mb-3">
                  {cv.title || cv.jobTitle || "Chưa có tiêu đề"}
                </p>
                <div className="flex flex-wrap gap-3">
                  {user.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MailOutlined className="text-green-600" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <PhoneOutlined className="text-green-600" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <EnvironmentOutlined className="text-green-600" />
                      <span>{user.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {cv.about && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <BulbOutlined className="text-blue-600" />
                Giới thiệu bản thân
              </h3>
              <p className="text-gray-700 leading-relaxed">{cv.about}</p>
            </div>
          )}

          {cv.workExperience && cv.workExperience.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CalendarOutlined className="text-purple-600" />
                Kinh nghiệm làm việc
              </h3>
              <div className="space-y-4">
                {cv.workExperience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-300 pl-4"
                  >
                    <h4 className="font-semibold text-gray-800">
                      {exp.position || exp.jobTitle}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {exp.company} • {exp.startDate} -{" "}
                      {exp.endDate || "Hiện tại"}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 text-sm mt-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {cv.education && cv.education.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <BookOutlined className="text-orange-600" />
                Học vấn
              </h3>
              <div className="space-y-4">
                {cv.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-orange-300 pl-4"
                  >
                    <h4 className="font-semibold text-gray-800">
                      {edu.degree || edu.major}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {edu.school} • {edu.startDate} -{" "}
                      {edu.endDate || "Hiện tại"}
                    </p>
                    {edu.description && (
                      <p className="text-gray-700 text-sm mt-2">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cv.skills && cv.skills.length > 0 && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BulbOutlined className="text-cyan-600" />
                  Kỹ năng
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cv.skills.map((skill, index) => (
                    <Tag key={index} color="cyan" className="text-sm">
                      {skill.name || skill}
                      {skill.level && ` - ${skill.level}`}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {cv.foreignLanguages && cv.foreignLanguages.length > 0 && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <GlobalOutlined className="text-green-600" />
                  Ngoại ngữ
                </h3>
                <div className="space-y-2">
                  {cv.foreignLanguages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700 font-medium">
                        {lang.language || lang.name}
                      </span>
                      <Tag color="green">{lang.level || lang.proficiency}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {cv.certificates && cv.certificates.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <TrophyOutlined className="text-yellow-600" />
                Chứng chỉ
              </h3>
              <div className="space-y-2">
                {cv.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {cert.name || cert.title}
                      </p>
                      {cert.issuer && (
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                      )}
                    </div>
                    {cert.date && (
                      <span className="text-sm text-gray-500">{cert.date}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {cv.fileUrl && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    CV đính kèm
                  </h3>
                  <p className="text-sm text-gray-600">
                    Click để xem CV đầy đủ của ứng viên
                  </p>
                </div>
                <a
                  href={cv.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Xem CV
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default CVPreviewModal;
