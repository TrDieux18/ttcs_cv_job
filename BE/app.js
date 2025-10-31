import express from "express";
import cors from "cors";
import clientRoute from "./routes/client/index.route.js";
import adminRoute from "./routes/admin/index.route.js";
import authRoute from "./routes/common/index.route.js";
import dotenv from "dotenv";
import connectDB from "./configs/database.js";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { SYSTEM } from "./configs/system.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);

app.use(
  cors({
    origin: process.env.ORIGIN_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, {
    query: req.query,
    body: req.body,
    params: req.params,
    // cookies: req.cookies, // ✅ Xem cookie luôn ở đây
  });
  next();
});

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(SYSTEM.PATH_AUTH, authRoute);
app.use(SYSTEM.PATH_ADMIN, adminRoute);
app.use(SYSTEM.PATH_CLIENT, clientRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
