const WorkExperience = ({ data = {} }) => {
  const isEmptyData =
    !data ||
    Object.values(data).every(
      (val) => !val || (typeof val === "string" && val.trim() === "")
    );

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            paddingTop: "20px",
            paddingLeft: "20px",
            paddingBottom: "20px",
            fontWeight: "bold",
            width: "152px",
          }}
        >
          Kinh nghiệm làm việc
        </div>
        <div style={{ color: "#6B7280", fontSize: "12px", padding: "20px" }}>
          <div>
            {isEmptyData ? (
              <p style={{ color: "#6B7280", fontStyle: "italic" }}>
                Thể hiện những thông tin chi tiết về quá trình làm việc
              </p>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <h1
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {data.ChucDanh}
                  </h1>
                  <h1 style={{ paddingRight: "12px", paddingLeft: "12px" }}>
                    |
                  </h1>
                  <h1>{data.TenCongTy}</h1>
                </div>
                <h1>
                  {data.thangnhap}/{data.namnhap} -{" "}
                  {data.thangcuoi === "Hiện tại"
                    ? "Hiện tại"
                    : `${data.thangcuoi}/${data.namcuoi}`}
                </h1>

                {data.text_MoTa && (
                  <div>
                    <h2
                      style={{
                        fontWeight: 600,
                        color: "#1F2937",
                        textTransform: "uppercase",
                      }}
                    >
                      Mô tả:
                    </h2>
                    <p style={{ color: "#374151" }}>{data.text_MoTa}</p>
                  </div>
                )}

                {data.text_DuAn && (
                  <div>
                    <h2
                      style={{
                        fontWeight: 600,
                        color: "#1F2937",
                        textTransform: "uppercase",
                      }}
                    >
                      Dự án:
                    </h2>
                    <p style={{ color: "#374151" }}>{data.text_DuAn}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <hr style={{ borderTop: "2px solid #D1D5DB" }} />
      </div>
    </div>
  );
};

export default WorkExperience;
