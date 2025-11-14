import { useState } from "react";

const About = ({ data = {} }) => {
  return (
    <div>
      {data.text && data.text.trim() !== "" && (
        <div>
          <div className="flex">
            <div className="flex-none p-5 w-36 whitespace-nowrap font-bold">
              Giới thiệu
            </div>
            <p className="text-[#6B7280] text-sm p-5">
              <span className="whitespace-pre-line">{data.text}</span>
            </p>
          </div>
          <div className="px-5">
            <hr className="border-t-2 border-[#D1D5DB]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
