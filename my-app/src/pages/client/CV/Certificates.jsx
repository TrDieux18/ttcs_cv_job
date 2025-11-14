import { useState } from "react";
const Certificates = ({ data = {} }) => {
  // Kiểm tra thiếu dữ liệu
  const hasEmptyField =
    !data ||
    Object.values(data).some(
      (val) => !val || (typeof val === "string" && val.trim() === "")
    );
  return (
    <div>
      {!hasEmptyField ? (
        <div>
          <div className="flex">
            <div className="p-5 whitespace-nowrap font-bold w-38 text-[#111827]">
              Chứng chỉ
            </div>

            <div className="text-truncated ims-2 text-[#6B7280] text-xs p-5">
              <h1 className="font-bold text-sm text-[#111827]">
                {data.TenChungChi}
              </h1>

              <div className="flex pt-2 pb-2 text-[#111827]">
                <h1>
                  {data.thang}/{data.nam}
                </h1>
                <h1 className="pr-2 pl-2">|</h1>
                <h1 className="font-bold">{data.ToChuc}</h1>
              </div>

              {data.link && (
                <p className="font-bold pb-2 text-[#111827]">
                  Link chứng chỉ:{" "}
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B7280] underline"
                  >
                    {data.link}
                  </a>
                </p>
              )}
              <h1 className="text-[#111827]">{data.text_MoTa}</h1>
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
export default Certificates;
