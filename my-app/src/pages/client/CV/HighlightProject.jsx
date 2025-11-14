import { useState } from "react";
const HighlightProject = ({data = {}}) => {

  const [isStudying, setIsStudying] = useState(false);

  // Kiểm tra thiếu dữ liệu
  const hasEmptyField =
    !data.TenDuAn ||
    !data.thangnhap ||
    !data.namnhap ||
    !data.text_MoTa;

  return (
    <div>
      {!hasEmptyField ? (
        <div>
          <div className="flex">
            <div className="p-5 whitespace-nowrap font-bold w-38 text-[#111827]">Dự án nổi bật</div>

            <div className="text-truncated ims-2 text-[#6B7280] text-xs p-5">
              <h1 className="uppercase text-base font-bold text-[#111827]">
                {data.thangnhap}/{data.namnhap} -{" "}
                {isStudying || data.thangcuoi === "Hiện tại"
                  ? "Hiện tại"
                  : `${data.thangcuoi}/${data.namcuoi}`}
              </h1>

              <h1 className="font-bold text-sm text-[#111827]">{data.TenDuAn}</h1>

              <h1 className="text-[#111827]">{data.text_MoTa}</h1>

              {data.link && (
                <p className="font-bold text-[#111827]">
                  Link dự án:{" "}
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

export default HighlightProject;
