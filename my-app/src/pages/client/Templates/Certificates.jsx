import { message } from "antd";
import { useState, useEffect } from "react";
import { LuCirclePlus, LuTrash2, LuPencil } from "react-icons/lu";

const Certificates = ({ cvData, updatedCvData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [tempData, setTempData] = useState({
    name: "",
    organization: "",
    year: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const firstCv = cvData?.[0];
    setCertificates(firstCv?.certificates || []);
  }, [cvData]);

  const handleOpenDialog = () => {
    setTempData({ name: "", organization: "", year: "" });
    setEditIndex(null);
    setError("");
    setIsOpen(true);
  };

  const handleEdit = (index) => {
    setTempData(certificates[index]);
    setEditIndex(index);
    setError("");
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!tempData.name || !tempData.organization || !tempData.year) {
      setError("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    let updatedCertificates;
    if (editIndex !== null) {
      updatedCertificates = [...certificates];
      updatedCertificates[editIndex] = tempData;
    } else {
      updatedCertificates = [...certificates, tempData];
    }

    const formData = new FormData();
    formData.append("certificates", JSON.stringify(updatedCertificates));

    setError("");
    const success = await updatedCvData?.(formData);
    if (success) {
      setCertificates(updatedCertificates);
      message.success(
        editIndex !== null
          ? "Cập nhật chứng chỉ thành công!"
          : "Thêm chứng chỉ thành công!"
      );
      setIsOpen(false);
    }
  };

  const handleDelete = async (index) => {
    const updatedCertificates = certificates.filter((_, i) => i !== index);

    const formData = new FormData();
    formData.append("certificates", JSON.stringify(updatedCertificates));

    const success = await updatedCvData?.(formData);
    if (success) {
      setCertificates(updatedCertificates);
      message.success("Xóa chứng chỉ thành công!");
    }
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative">
      <div className="w-full h-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[22px] font-bold">Chứng chỉ</h1>
          <button onClick={handleOpenDialog}>
            <LuCirclePlus className="size-4 text-red-600 hover:scale-110 transition-transform" />
          </button>
        </div>

        {certificates.length > 0 && (
          <hr className="mt-4 mb-3 border-gray-300" />
        )}

        <div className="align-middle mt-2">
          {certificates.length === 0 ? (
            <p className="text-gray-500">
              Thêm các chứng chỉ chuyên môn của bạn
            </p>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-3 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="font-bold text-lg">{cert.name}</h2>
                      <p className="text-gray-700">{cert.organization}</p>
                      <p className="text-gray-600 text-sm">{cert.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <LuPencil className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <LuTrash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-250 max-h-[90vh] overflow-y-auto text-left">
            <h1 className="text-[22px] font-semibold px-8 py-4 border-b border-gray-300">
              {editIndex !== null ? "Chỉnh sửa chứng chỉ" : "Thêm chứng chỉ"}
            </h1>

            <div className="px-8 py-6">
              {error && (
                <p className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
                  {error}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="font-semibold mb-1 block">
                    Tên chứng chỉ
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleChange}
                    placeholder="VD: AWS Certified Solutions Architect"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold mb-1 block">
                    Tổ chức cấp
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={tempData.organization}
                    onChange={handleChange}
                    placeholder="VD: Amazon Web Services"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold mb-1 block">Năm cấp</label>
                  <input
                    type="text"
                    name="year"
                    value={tempData.year}
                    onChange={handleChange}
                    placeholder="VD: 2024"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end px-8 py-4 border-t border-gray-300 gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
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

export default Certificates;
