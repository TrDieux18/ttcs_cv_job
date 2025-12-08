import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { message, Spin } from "antd";
import { getUserProfile } from "@services/client/UserService";
import { getCvByUserId } from "@services/client/CvService";
import avatar from "@assets/image/avatar.jpg";

const CV = () => {
  const cvRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileResponse, cvResponse] = await Promise.all([
          getUserProfile(),
          getCvByUserId(),
        ]);

        if (profileResponse?.success) {
          setProfileData(profileResponse.data);
        }
        if (cvResponse?.success && cvResponse.data?.length > 0) {
          setCvData(cvResponse.data[0]);
        }
      } catch (error) {
        message.error("Unable to load CV data!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDownload = () => {
    const element = cvRef.current;
    const options = {
      margin: [0, 0, 0, 0],
      filename: `${profileData?.fullName || "CV"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        letterRendering: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        imageTimeout: 0,
        removeContainer: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf().set(options).from(element).save();
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const Sidebar = () => {
    const avatarSrc = profileData?.avatar || avatar;

    return (
      <div
        style={{
          width: "250px",
          backgroundColor: "#34495E",
          color: "white",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <img
            src={avatarSrc}
            alt="avatar"
            crossOrigin="anonymous"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "65px",
              objectFit: "cover",
              border: "4px solid white",
            }}
          />
        </div>

        {profileData?.introduction && profileData.introduction.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "700",
                textTransform: "uppercase",
                marginBottom: "10px",
                borderBottom: "2px solid white",
                paddingBottom: "6px",
              }}
            >
              About
            </h2>
            <p
              style={{
                fontSize: "11px",
                lineHeight: "1.5",
                color: "#ECF0F1",
                textAlign: "justify",
              }}
            >
              {profileData.introduction.join(" ")}
            </p>
          </div>
        )}

        <div>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "700",
              textTransform: "uppercase",
              marginBottom: "10px",
              borderBottom: "2px solid white",
              paddingBottom: "6px",
            }}
          >
            Contact
          </h2>
          <div
            style={{ fontSize: "10px", lineHeight: "1.8", color: "#ECF0F1" }}
          >
            {profileData?.email && (
              <div style={{ marginBottom: "8px", display: "flex", gap: "6px" }}>
                <strong style={{ minWidth: "50px" }}>Email:</strong>
                <div style={{ flex: 1, wordBreak: "break-word" }}>
                  {profileData.email}
                </div>
              </div>
            )}
            {profileData?.phoneNumber && (
              <div style={{ marginBottom: "8px", display: "flex", gap: "6px" }}>
                <strong style={{ minWidth: "50px" }}>Phone:</strong>
                <div style={{ flex: 1 }}>{profileData.phoneNumber}</div>
              </div>
            )}
            {profileData?.address && (
              <div style={{ marginBottom: "8px", display: "flex", gap: "6px" }}>
                <strong style={{ minWidth: "50px" }}>Address:</strong>
                <div style={{ flex: 1, wordBreak: "break-word" }}>
                  {profileData.address}
                </div>
              </div>
            )}
            {profileData?.socialLinks && (
              <div style={{ marginBottom: "8px", display: "flex", gap: "6px" }}>
                <strong style={{ minWidth: "50px" }}>Links:</strong>
                <div style={{ flex: 1, wordBreak: "break-word" }}>
                  {profileData.socialLinks}
                </div>
              </div>
            )}
          </div>
        </div>

        {cvData?.skills && cvData.skills.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "700",
                textTransform: "uppercase",
                marginBottom: "10px",
                borderBottom: "2px solid white",
                paddingBottom: "6px",
              }}
            >
              Skills
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {cvData.skills.map((item, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "11px",
                    color: "#ECF0F1",
                    display: "flex",
                    flexDirection: "row",
                    gap: "6px",
                  }}
                >
                  <div style={{ fontWeight: "600", minWidth: "60px" }}>
                    {item.name || item.skill || item}
                  </div>
                  {(item.experience || item.level) && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#BDC3C7",
                        fontStyle: "italic",
                        flex: 1,
                      }}
                    >
                      • {item.experience || item.level}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {profileData?.foreignLanguages &&
          profileData.foreignLanguages.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                  borderBottom: "2px solid white",
                  paddingBottom: "6px",
                }}
              >
                Languages
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {profileData.foreignLanguages.map((item, index) => (
                  <div
                    key={index}
                    style={{ fontSize: "11px", color: "#ECF0F1" }}
                  >
                    <span style={{ fontWeight: "600" }}>{item.language}</span>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#BDC3C7",
                        marginLeft: "6px",
                      }}
                    >
                      • {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  };

  const MainContent = () => (
    <div style={{ flex: 1, padding: "30px 25px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#2C3E50",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "8px",
          }}
        >
          {profileData?.fullName || ""}
        </h1>
        <div
          style={{
            fontSize: "13px",
            color: "#7F8C8D",
            fontStyle: "italic",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {cvData?.position || "Professional"}
        </div>
        <div
          style={{
            height: "3px",
            width: "60px",
            backgroundColor: "#3498DB",
            marginTop: "8px",
          }}
        />
      </div>

      {cvData?.education &&
        cvData.education.length > 0 &&
        cvData.education[0]?.school && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#2C3E50",
                textTransform: "uppercase",
                marginBottom: "12px",
                borderBottom: "2px solid #3498DB",
                paddingBottom: "6px",
              }}
            >
              Education
            </h2>
            {cvData.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#34495E",
                    marginBottom: "4px",
                  }}
                >
                  {edu.school}
                </h3>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#555",
                    marginBottom: "3px",
                    fontWeight: "600",
                  }}
                >
                  {edu.degree}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#7F8C8D",
                    fontStyle: "italic",
                  }}
                >
                  {edu.from} - {edu.to || "Present"}
                </div>
              </div>
            ))}
          </div>
        )}

      {cvData?.experience &&
        cvData.experience.length > 0 &&
        cvData.experience[0]?.position && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#2C3E50",
                textTransform: "uppercase",
                marginBottom: "12px",
                borderBottom: "2px solid #3498DB",
                paddingBottom: "6px",
              }}
            >
              Work Experience
            </h2>
            {cvData.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: "14px" }}>
                <div style={{ marginBottom: "4px" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#34495E",
                    }}
                  >
                    {exp.position}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#3498DB",
                      margin: "0 8px",
                    }}
                  >
                    @
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#555",
                    }}
                  >
                    {exp.company}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#7F8C8D",
                    fontStyle: "italic",
                    marginBottom: "8px",
                  }}
                >
                  {exp.from} - {exp.to || "Present"}
                </div>
                {exp.description && (
                  <div style={{ marginBottom: "6px" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#34495E",
                        marginBottom: "3px",
                      }}
                    >
                      • Description:
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#555",
                        lineHeight: "1.5",
                        margin: 0,
                        paddingLeft: "12px",
                      }}
                    >
                      {exp.description}
                    </p>
                  </div>
                )}
                {exp.project && (
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#34495E",
                        marginBottom: "3px",
                      }}
                    >
                      • Projects:
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#555",
                        lineHeight: "1.5",
                        margin: 0,
                        paddingLeft: "12px",
                      }}
                    >
                      {exp.project}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      {cvData?.projects &&
        cvData.projects.length > 0 &&
        cvData.projects[0]?.name && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#2C3E50",
                textTransform: "uppercase",
                marginBottom: "12px",
                borderBottom: "2px solid #3498DB",
                paddingBottom: "6px",
              }}
            >
              Projects
            </h2>
            {cvData.projects.map((proj, index) => (
              <div key={index} style={{ marginBottom: "12px" }}>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#34495E",
                    marginBottom: "4px",
                  }}
                >
                  {proj.name}
                </h3>
                {proj.role && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      fontWeight: "600",
                      marginBottom: "3px",
                    }}
                  >
                    {proj.role}
                  </div>
                )}
                <div
                  style={{
                    fontSize: "11px",
                    color: "#7F8C8D",
                    fontStyle: "italic",
                    marginBottom: "6px",
                  }}
                >
                  {proj.from} - {proj.to || "Present"}
                </div>
                {proj.description && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#555",
                      lineHeight: "1.5",
                      margin: "0 0 6px 0",
                    }}
                  >
                    {proj.description}
                  </p>
                )}
                {proj.technology && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#555",
                    }}
                  >
                    <strong>Technology:</strong> {proj.technology}
                  </div>
                )}
                {proj.link && (
                  <div style={{ marginTop: "4px" }}>
                    <a
                      href={proj.link}
                      style={{
                        fontSize: "10px",
                        color: "#3498DB",
                        textDecoration: "underline",
                      }}
                    >
                      View Project
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      {cvData?.certificates &&
        cvData.certificates.length > 0 &&
        cvData.certificates[0]?.name && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#2C3E50",
                textTransform: "uppercase",
                marginBottom: "12px",
                borderBottom: "2px solid #3498DB",
                paddingBottom: "6px",
              }}
            >
              Certificates
            </h2>
            {cvData.certificates.map((cert, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#34495E",
                    marginBottom: "3px",
                  }}
                >
                  {cert.name}
                </h3>
                <div style={{ fontSize: "11px", color: "#555" }}>
                  <span style={{ fontWeight: "600" }}>
                    {cert.from || cert.organization}
                  </span>
                  {(cert.time || cert.year) && (
                    <>
                      <span style={{ margin: "0 6px", color: "#3498DB" }}>
                        •
                      </span>
                      <span style={{ color: "#7F8C8D", fontStyle: "italic" }}>
                        {cert.time || cert.year}
                      </span>
                    </>
                  )}
                </div>
                {cert.link && (
                  <div style={{ marginTop: "4px" }}>
                    <a
                      href={cert.link}
                      style={{
                        fontSize: "10px",
                        color: "#3498DB",
                        textDecoration: "underline",
                      }}
                    >
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      {cvData?.awards && cvData.awards.length > 0 && cvData.awards[0]?.name && (
        <div style={{ marginBottom: "22px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#2C3E50",
              textTransform: "uppercase",
              marginBottom: "12px",
              borderBottom: "2px solid #3498DB",
              paddingBottom: "6px",
            }}
          >
            Awards
          </h2>
          {cvData.awards.map((award, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#34495E",
                  marginBottom: "3px",
                }}
              >
                {award.name}
              </h3>
              <div style={{ fontSize: "11px", color: "#555" }}>
                {award.organization && (
                  <span style={{ fontWeight: "600" }}>
                    {award.organization}
                  </span>
                )}
                {award.time && (
                  <>
                    {award.organization && (
                      <span style={{ margin: "0 6px", color: "#3498DB" }}>
                        •
                      </span>
                    )}
                    <span style={{ color: "#7F8C8D", fontStyle: "italic" }}>
                      {award.time}
                    </span>
                  </>
                )}
              </div>
              {award.description && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#555",
                    lineHeight: "1.5",
                    margin: "4px 0 0 0",
                  }}
                >
                  {award.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#d1d5db",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        ref={cvRef}
        style={{
          width: "210mm",
          height: "297mm",
          padding: "0",
          boxSizing: "border-box",
          overflow: "hidden",
          backgroundColor: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <Sidebar />
        <MainContent />
      </div>

      <div style={{ paddingTop: "20px", display: "flex", gap: "12px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            width: "200px",
            height: "40px",
            backgroundColor: "white",
            color: "#374151",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Backcar iwr
        </button>
        <button
          onClick={handleDownload}
          style={{
            border: "1px solid transparent",
            borderRadius: "8px",
            width: "594px",
            height: "40px",
            backgroundColor: "rgb(237,27,47)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Download CV
        </button>
      </div>
    </div>
  );
};

export default CV;
