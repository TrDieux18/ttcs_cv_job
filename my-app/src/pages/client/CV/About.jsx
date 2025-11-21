import { useState } from "react";

const About = ({ data = {} }) => {
  return (
    <div>
      {data.text && data.text.trim() !== "" && (
        <div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flexShrink: 0,
                padding: "20px",
                width: "144px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
              }}
            >
              Giới thiệu
            </div>
            <p style={{ color: "#6B7280", fontSize: "14px", padding: "20px" }}>
              <span style={{ whiteSpace: "pre-line" }}>{data.text}</span>
            </p>
          </div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <hr style={{ borderTop: "2px solid #D1D5DB" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
