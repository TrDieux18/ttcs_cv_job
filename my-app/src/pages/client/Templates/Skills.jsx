import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const Skills = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  // Thêm kỹ năng vào danh sách
  const handleAdd = () => {
    setError("");

    if (!selectedSkill) {
      setError("Vui lòng chọn kỹ năng!");
      return;
    }

    if (!selectedLevel) {
      setError("Vui lòng chọn trình độ!");
      return;
    }

    // Kiểm tra trùng
    const existed = skills.some(
      (item) => item.skill === selectedSkill && item.level === selectedLevel
    );
    if (existed) {
      setError("Kỹ năng này đã tồn tại trong danh sách!");
      return;
    }

    const newSkill = { skill: selectedSkill, level: selectedLevel };
    setSkills([...skills, newSkill]);

    setSelectedSkill("");
    setSelectedLevel("");
  };

  // Xóa chip
  const handleRemove = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative m-3">
      <div className="flex p-3">
        <h1 className="text-3xl font-bold text-center py-5">Kỹ năng</h1>
        <button className="absolute right-2 top-2" onClick={() => setIsOpen(true)}>
          <CiCirclePlus className="size-10 text-red-600" />
        </button>
      </div>
      <hr />

      {/* Hiển thị danh sách kỹ năng */}
      <div className="p-3 flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm"
            >
              <span className="font-semibold">{item.skill}</span>
              <span className="text-gray-600">({item.level})</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Liệt kê các kỹ năng chuyên môn của bạn</p>
        )}
      </div>

      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-250">
            <h1 className="text-4xl font-semibold mb-4">Kỹ năng</h1>
            <hr />

            <div className="mt-4">
              <p className="font-bold">Danh sách kỹ năng:</p>

              <div className="flex gap-4 mt-2">
                {/* Select Skill */}
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="border border-gray-300 rounded-md h-13 w-110 px-2 shadow-lg"
                >
                  <option value="">Chọn kỹ năng</option>
                  <option value="VS code">VS code</option>
                  <option value="C/C++">C/C++</option>
                  <option value="C#">C#</option>
                  <option value="Python">Python</option>
                  <option value="SQL">SQL</option>
                  <option value="ReactJs">ReactJs</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Cloud">Cloud</option>
                </select>

                {/* Select Level */}
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="border border-gray-300 rounded-md h-13 w-110 px-2 shadow-lg"
                >
                  <option value="">Chọn trình độ</option>
                  <option value="1 năm"> 1 năm</option>
                  <option value="2 năm">2 năm</option>
                  <option value="3 năm">3 năm</option>
                  <option value="4 năm">4 năm</option>
                  <option value="5 năm">5 năm</option>
                  <option value="6 năm">6 năm</option>
                  <option value="7 năm">7 năm</option>
                  <option value="8 năm">8 năm</option>

                </select>

                {/* Add button */}
                <button
                  onClick={handleAdd}
                  className="border border-red-600 text-red-600 rounded-md w-13"
                >
                  +
                </button>
              </div>

              {/* Chip hiển thị trong popup */}
              <div className="flex flex-wrap gap-3 mt-4">
                {skills.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm"
                  >
                    <span className="font-semibold">{item.skill}</span>
                    <span className="text-gray-600">({item.level})</span>

                    <button
                      onClick={() => handleRemove(index)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {error && <p className="text-red-500 mt-3">{error}</p>}
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => setIsOpen(false)}
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

export default Skills;
