import { useState } from "react";

const ForeignLanguages = ({ data = [] }) => {
  return (
    <div>
      {data.length > 0 ? (
        <div>
          <div className="flex">
            <div className="flex-none p-5 w-38 whitespace-nowrap font-bold text-[#111827]">
              Ngoại ngữ
            </div>

            <div className="p-3 flex flex-wrap gap-3">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-[#F3F4F6] rounded-full px-3 py-1 text-xs"
                  >
                    <span className="font-semibold text-[#111827]">
                      {item.language}
                    </span>
                    <span className="text-[#6B7280]">({item.level})</span>
                  </div>
                ))
              ) : (
                <p className="text-[#6B7280] italic">
                  Liệt kê các kỹ năng chuyên môn của bạn
                </p>
              )}
            </div>
          </div>

          <div className="px-5">
            <hr className="border-t-2 border-[#D1D5DB]" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ForeignLanguages;
