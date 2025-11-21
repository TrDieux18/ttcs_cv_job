import { useState } from "react";

const ForeignLanguages = ({ data = [] }) => {
  return (
    <div>
      {data.length > 0 ? (
        <div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flexShrink: 0,
                padding: "20px",
                width: "152px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                color: "#111827",
              }}
            >
              Ngoại ngữ
            </div>

            <div
              style={{
                padding: "12px",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {data.length > 0 ? (
                data.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "#111827" }}>
                      {item.language}
                    </span>
                    <span style={{ color: "#6B7280" }}>({item.level})</span>
                  </div>
                ))
              ) : (
                <p style={{ color: "#6B7280", fontStyle: "italic" }}>
                  Liệt kê các kỹ năng chuyên môn của bạn
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

export default ForeignLanguages;
