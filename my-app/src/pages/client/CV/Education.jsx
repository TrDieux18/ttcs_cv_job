const Education = ({ data }) => {
  const isStudying = false;
  const hasEmptyField = Object.values(data).some((val) => val.trim() === "");

  if (hasEmptyField) return null;

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "20px",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            width: "152px",
          }}
        >
          Học vấn
        </div>
        <div style={{ color: "#4B5563", fontSize: "12px", padding: "20px" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "16px" }}>
            {data.Truong}
          </h1>
          <h1 style={{ fontWeight: "bold" }}>
            {data.Trinh_Do} - {data.Nganh}
          </h1>
          <h1>
            {data.thangnhap}/{data.namnhap} -{" "}
            {isStudying || data.thangcuoi === "Hiện tại"
              ? "Hiện tại"
              : `${data.thangcuoi}/${data.namcuoi}`}
          </h1>
          <h1 style={{ paddingTop: "8px" }}>{data.thongTinKhac}</h1>
        </div>
      </div>
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <hr style={{ borderTop: "2px solid #D1D5DB" }} />
      </div>
    </div>
  );
};

export default Education;
