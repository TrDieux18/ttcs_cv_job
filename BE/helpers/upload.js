import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/", // thư mục lưu file
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// import multer from "multer";

// // lưu file trong RAM
// export const upload = multer({ storage: multer.memoryStorage() });
