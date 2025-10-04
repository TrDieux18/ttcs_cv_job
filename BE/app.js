import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./configs/database.js";

const app = express();
const port = process.env.PORT;
dotenv.config();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, {
    query: req.query,
    body: req.body,
    params: req.params,
  });
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Kết nối FE
app.use(cors({ origin: process.env.ORIGIN_URL }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
