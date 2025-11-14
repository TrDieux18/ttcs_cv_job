const Skills = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <div className="flex">
        <div className="flex-none p-5 w-36 whitespace-nowrap font-bold">
          Kỹ năng
        </div>

        <div className="p-3 flex flex-wrap gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-[#F3F4F6] rounded-full px-3 py-1 text-xs"
            >
              <span className="font-semibold">{item.skill}</span>
              <span className="text-[#6B7280]">({item.level})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <hr className="border-t-2 border-[#D1D5DB]" />
      </div>
    </div>
  );
};

export default Skills;
