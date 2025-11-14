const Education = ({ data }) => {
  const isStudying = false;
  const hasEmptyField = Object.values(data).some((val) => val.trim() === "");

  if (hasEmptyField) return null;

  return (
    <div>
      <div className="flex">
        <div className="p-5 whitespace-nowrap font-bold w-38">Học vấn</div>
        <div className="text-truncated ims-2 text-[#4B5563] text-xs p-5">
          <h1 className="font-bold text-base">{data.Truong}</h1>
          <h1 className="font-bold">
            {data.Trinh_Do} - {data.Nganh}
          </h1>
          <h1>
            {data.thangnhap}/{data.namnhap} -{" "}
            {isStudying || data.thangcuoi === "Hiện tại"
              ? "Hiện tại"
              : `${data.thangcuoi}/${data.namcuoi}`}
          </h1>
          <h1 className="pt-2">{data.thongTinKhac}</h1>
        </div>
      </div>
      <div className="pr-5 pl-5">
        <hr className="border-t-2 border-[#D1D5DB]" />
      </div>
    </div>
  );
};

export default Education;
