const WorkExperience = ({ data = {} }) => {
  const isEmptyData =
    !data ||
    Object.values(data).every(
      (val) => !val || (typeof val === "string" && val.trim() === "")
    );

  return (
    <div>
      <div className="flex">
        <div className="pt-5 pl-5 pb-5 font-bold w-38">
          Kinh nghiệm làm việc
        </div>
        <div className="text-truncated ims-2 text-[#6B7280] text-xs p-5">
          <div className="">
            {isEmptyData ? (
              <p className="text-[#6B7280] italic">
                Thể hiện những thông tin chi tiết về quá trình làm việc
              </p>
            ) : (
              <>
                <div className="flex text-base text-black font-bold">
                  <h1 className="font-bold uppercase">{data.ChucDanh}</h1>
                  <h1 className="pr-3 pl-3">|</h1>
                  <h1 className="">{data.TenCongTy}</h1>
                </div>
                <h1>
                  {data.thangnhap}/{data.namnhap} -{" "}
                  {data.thangcuoi === "Hiện tại"
                    ? "Hiện tại"
                    : `${data.thangcuoi}/${data.namcuoi}`}
                </h1>

                {data.text_MoTa && (
                  <div className="">
                    <h2 className="font-semibold text-[#1F2937] uppercase">
                      Mô tả:
                    </h2>
                    <p className="text-[#374151">{data.text_MoTa}</p>
                  </div>
                )}

                {data.text_DuAn && (
                  <div className="">
                    <h2 className="font-semibold text-[#1F2937]  uppercase">
                      Dự án:
                    </h2>
                    <p className="text-[#374151">{data.text_DuAn}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="pr-5 pl-5">
        <hr className="border-t-2 border-[#D1D5DB]" />
      </div>
    </div>
  );
};

export default WorkExperience;
