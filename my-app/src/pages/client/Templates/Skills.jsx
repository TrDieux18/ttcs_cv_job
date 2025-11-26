import { message, Select } from "antd";
import { useState, useEffect } from "react";
import { LuCirclePlus } from "react-icons/lu";

const Skills = ({ cvData, updatedCvData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  const allSkills = [
    "JavaScript",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Python",
    "C/C++",
    "C#",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "ReactJS",
    "VueJS",
    "Angular",
    "NodeJS",
    "ExpressJS",
    "NestJS",
    "Django",
    "Flask",
    "Laravel",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Git",
    "Linux",
    "CI/CD",
    "Microservices",
    "RESTful API",
    "GraphQL",
  ];

  const availableSkills = allSkills.filter(
    (skill) => !skills.some((s) => s.name === skill)
  );

  useEffect(() => {
    const firstCv = cvData?.[0];

    if (firstCv?.skills && Array.isArray(firstCv.skills)) {
      if (firstCv.skills.length > 0 && typeof firstCv.skills[0] === "object") {
        setSkills(firstCv.skills);
      } else if (
        firstCv.skills.length > 0 &&
        typeof firstCv.skills[0] === "string"
      ) {
        const converted = firstCv.skills.map((s) => ({
          name: s,
          experience: "1 năm",
        }));
        setSkills(converted);
      }
    }
  }, [cvData]);

  const handleAdd = () => {
    setError("");

    if (!selectedSkill) {
      setError("Vui lòng chọn kỹ năng!");
      return;
    }

    if (!selectedExperience) {
      setError("Vui lòng chọn số năm kinh nghiệm!");
      return;
    }

    const existed = skills.some((s) => s.name === selectedSkill);
    if (existed) {
      setError("Kỹ năng này đã tồn tại trong danh sách!");
      return;
    }

    setSkills([
      ...skills,
      { name: selectedSkill, experience: selectedExperience },
    ]);

    setSelectedSkill("");
    setSelectedExperience("");
  };

  const handleRemove = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("skills", JSON.stringify(skills));

    const success = await updatedCvData(formData);
    if (success) {
      message.success("Cập nhật kỹ năng thành công!");
      setIsOpen(false);
    }
  };

  return (
    <div className="w-200 h-auto bg-white rounded-lg shadow-sm relative ">
      <div className="w-full h-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[22px] font-bold">Kỹ năng</h1>

          <button onClick={() => setIsOpen(true)}>
            <LuCirclePlus className="size-4 text-red-600 hover:scale-110 transition-transform" />
          </button>
        </div>

        {skills.length > 0 && <hr className="mt-4 mb-3 border-gray-300" />}

        <div className="align-middle mt-2 flex flex-wrap gap-3 text-lg">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1 text-sm"
              >
                <span className="font-semibold">{skill.name}</span>
                <span className="text-gray-600">({skill.experience})</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-[16px]">
              Liệt kê các kỹ năng chuyên môn của bạn
            </p>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-250 h-auto text-left">
            <h1 className="text-[22px] font-semibold px-8 py-4 border-b border-gray-300">
              Kỹ năng
            </h1>

            <div className="px-8 py-6">
              <p className="font-bold mb-2">Danh sách kỹ năng:</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-semibold mb-1 block">Kỹ năng</label>
                  <Select
                    value={selectedSkill || undefined}
                    onChange={(value) => setSelectedSkill(value)}
                    placeholder={`Chọn kỹ năng (${availableSkills.length})`}
                    className="w-full"
                    size="large"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.children ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    listHeight={300}
                  >
                    {availableSkills.map((skill) => (
                      <Select.Option key={skill} value={skill}>
                        {skill}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="font-semibold mb-1 block">
                    Kinh nghiệm
                  </label>
                  <Select
                    value={selectedExperience || undefined}
                    onChange={(value) => setSelectedExperience(value)}
                    placeholder="Chọn kinh nghiệm"
                    className="w-full"
                    size="large"
                  >
                    <Select.Option value="Dưới 1 năm">Dưới 1 năm</Select.Option>
                    <Select.Option value="1 năm">1 năm</Select.Option>
                    <Select.Option value="2 năm">2 năm</Select.Option>
                    <Select.Option value="3 năm">3 năm</Select.Option>
                    <Select.Option value="4 năm">4 năm</Select.Option>
                    <Select.Option value="Trên 5 năm">Trên 5 năm</Select.Option>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition font-medium"
              >
                + Thêm kỹ năng
              </button>

              {skills.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">
                    Kỹ năng đã chọn ({skills.length}):
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm"
                      >
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-gray-600">
                          ({skill.experience})
                        </span>

                        <button
                          onClick={() => handleRemove(index)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div className="flex justify-end px-8 py-2 border-t border-gray-300 gap-4">
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

export default Skills;
