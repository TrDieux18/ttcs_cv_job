import express from "express";
import cors from "cors";
import clientRoute from "./routes/client/index.route.js";
import adminRoute from "./routes/admin/index.route.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { SYSTEM } from "./config/system.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.ORIGIN_URL || "http://localhost:5173",
    credentials: true, // ✅ Cho phép cookie cross-origin
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, {
    query: req.query,
    body: req.body,
    params: req.params,
    cookies: req.cookies, // ✅ Xem cookie luôn ở đây
  });
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(SYSTEM.PATH_ADMIN, adminRoute);
app.use(SYSTEM.PATH_CLIENT, clientRoute);
//Kết nối FE
app.use(cors({ origin: process.env.ORIGIN_URL }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
