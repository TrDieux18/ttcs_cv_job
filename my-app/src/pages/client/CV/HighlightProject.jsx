import { useState } from "react";
const HighlightProject = ({ data = {} }) => {
  const [isStudying, setIsStudying] = useState(false);

  // Kiểm tra thiếu dữ liệu
  const hasEmptyField =
    !data.TenDuAn || !data.thangnhap || !data.namnhap || !data.text_MoTa;

  return (
    <div>
      {!hasEmptyField ? (
        <div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                padding: "20px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                width: "152px",
                color: "#111827",
              }}
            >
              Dự án nổi bật
            </div>

            <div
              style={{ color: "#6B7280", fontSize: "12px", padding: "20px" }}
            >
              <h1
                style={{
                  textTransform: "uppercase",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {data.thangnhap}/{data.namnhap} -{" "}
                {isStudying || data.thangcuoi === "Hiện tại"
                  ? "Hiện tại"
                  : `${data.thangcuoi}/${data.namcuoi}`}
              </h1>

              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#111827",
                }}
              >
                {data.TenDuAn}
              </h1>

              <h1 style={{ color: "#111827" }}>{data.text_MoTa}</h1>

              {data.link && (
                <p style={{ fontWeight: "bold", color: "#111827" }}>
                  Link dự án:{" "}
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#6B7280", textDecoration: "underline" }}
                  >
                    {data.link}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <hr style={{ borderTop: "2px solid #D1D5DB" }} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HighlightProject;
