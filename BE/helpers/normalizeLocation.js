const locationMapping = {
  hanoi: ["Hà Nội", "Ha Noi", "Hanoi"],
  hochiminh: [
    "Hồ Chí Minh",
    "Ho Chi Minh",
    "TP HCM",
    "TP.HCM",
    "TPHCM",
    "Sài Gòn",
    "Saigon",
  ],
  danang: ["Đà Nẵng", "Da Nang", "Danang"],
  haiphong: ["Hải Phòng", "Hai Phong", "Haiphong"],
  cantho: ["Cần Thơ", "Can Tho", "Cantho"],
};

export const normalizeLocation = (locationSlug) => {
  if (!locationSlug || locationSlug === "all") {
    return null;
  }

  const locationKey = locationSlug.toLowerCase().trim();
  const locationVariants = locationMapping[locationKey];

  if (locationVariants) {
    const pattern = locationVariants.join("|");
    return new RegExp(pattern, "i");
  }

  return new RegExp(locationSlug, "i");
};

export default normalizeLocation;
