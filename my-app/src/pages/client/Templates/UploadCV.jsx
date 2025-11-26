import { message, Upload } from "antd";
import { useState, useEffect } from "react";
import {
  LuCirclePlus,
  LuFileText,
  LuTrash2,
  LuExternalLink,
} from "react-icons/lu";
import { Link } from "react-router-dom";

const UploadCV = ({ cvData, updatedCvData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const firstCv = cvData?.[0];
    setFileUrl(firstCv?.fileUrl || "");
  }, [cvData]);

  const handleOpenDialog = () => {
    setFile(null);
    setIsOpen(true);
  };

  const handleFileChange = (info) => {
    if (!info.file) return;

    const selectedFile = info.file.originFileObj || info.file;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      message.error("Chỉ chấp nhận file PDF hoặc Word!");
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      message.error("File không được vượt quá 5MB!");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("Vui lòng chọn file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    const success = await updatedCvData?.(formData);
    setUploading(false);

    if (success) {
      message.success("Upload CV thành công!");
      setIsOpen(false);
      setFile(null);
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("fileUrl", "");

    const success = await updatedCvData?.(formData);
    if (success) {
      setFileUrl("");
      message.success("Xóa CV thành công!");
    }
  };

  const handleViewFile = () => {
    if (!fileUrl) {
      message.error("Không tìm thấy file CV!");
      return;
    }

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative">
      <div className="w-full h-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[22px] font-bold">Hồ sơ đính kèm</h1>
          <button onClick={handleOpenDialog}>
            <LuCirclePlus className="size-4 text-red-600 hover:scale-110 transition-transform" />
          </button>
        </div>

        {fileUrl && <hr className="mt-4 mb-3 border-gray-300" />}

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
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                <LuTrash2 className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-250 text-left">
            <h1 className="text-[22px] font-semibold px-8 py-4 border-b border-gray-300">
              Hồ sơ đính kèm
            </h1>

            <div className="px-8 py-6">
              <p className="text-gray-600 mb-4">
                Chấp nhận file: PDF, DOC, DOCX (Tối đa 5MB)
              </p>

              <Upload.Dragger
                beforeUpload={() => false}
                onChange={handleFileChange}
                maxCount={1}
                accept=".pdf,.doc,.docx"
              >
                <p className="text-4xl mb-2">📄</p>
                <p className="text-base font-semibold">
                  Click hoặc kéo file vào đây để upload
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PDF, DOC, DOCX (tối đa 5MB)
                </p>
              </Upload.Dragger>
            </div>

            <div className="flex justify-end px-8 py-4 border-t border-gray-300 gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {uploading ? "Đang upload..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCV;
