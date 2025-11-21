import avatar from "../../../assets/image/avatar.jpg";

const Profile = ({ data = {} }) => {
  return (
    <div
      style={{
        backgroundColor: "#383d44",
        color: "white",
        padding: "24px",
        display: "flex",
        gap: "24px",
        width: "100%",
      }}
    >
      <img
        src={avatar}
        alt="avatar"
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "80px",
          objectFit: "cover",
        }}
      />

      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          {data.name}
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            fontSize: "12px",
            marginTop: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", minWidth: "60px" }}>Email:</span>
            {data.email && data.email.trim() !== "" ? (
              data.email
            ) : (
              <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>
                Email
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", minWidth: "60px" }}>Phone:</span>
            {data.phone && data.phone.trim() !== "" ? (
              data.phone
            ) : (
              <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>
                Số điện thoại
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", minWidth: "60px" }}>
              Birthday:
            </span>
            {data.birthday && data.birthday.trim() !== "" ? (
              data.birthday
            ) : (
              <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>
                Ngày sinh
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", minWidth: "60px" }}>
              Gender:
            </span>
            {data.gender && data.gender.trim() !== "" ? (
              data.gender
            ) : (
              <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>
                Giới tính
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", minWidth: "60px" }}>
              Address:
            </span>
            {data.address && data.address.trim() !== "" ? (
              data.address
            ) : (
              <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>
                Địa chỉ
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", minWidth: "60px" }}>Link:</span>
            {data.personalLink && data.personalLink.trim() !== "" ? (
              data.personalLink
            ) : (
              <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>
                Liên hệ cá nhân
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
