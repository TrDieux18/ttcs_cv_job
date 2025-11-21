const Skills = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
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
          Kỹ năng
        </div>

        <div
          style={{
            padding: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {data.map((item, index) => (
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
              <span style={{ fontWeight: 600 }}>{item.skill}</span>
              <span style={{ color: "#6B7280" }}>({item.level})</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <hr style={{ borderTop: "2px solid #D1D5DB" }} />
      </div>
    </div>
  );
};

export default Skills;
