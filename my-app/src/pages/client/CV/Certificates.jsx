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
              Chứng chỉ
            </div>

            <div
              style={{ color: "#6B7280", fontSize: "12px", padding: "20px" }}
            >
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#111827",
                }}
              >
                {data.TenChungChi}
              </h1>

              <div
                style={{
                  display: "flex",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  color: "#111827",
                }}
              >
                <h1>
                  {data.thang}/{data.nam}
                </h1>
                <h1 style={{ paddingRight: "8px", paddingLeft: "8px" }}>|</h1>
                <h1 style={{ fontWeight: "bold" }}>{data.ToChuc}</h1>
              </div>

              {data.link && (
                <p
                  style={{
                    fontWeight: "bold",
                    paddingBottom: "8px",
                    color: "#111827",
                  }}
                >
                  Link chứng chỉ:{" "}
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
              <h1 style={{ color: "#111827" }}>{data.text_MoTa}</h1>
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
export default Certificates;
