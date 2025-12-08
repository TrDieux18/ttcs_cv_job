import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import clientRoute from "./routes/client/index.route.js";
import adminRoute from "./routes/admin/index.route.js";
import authRoute from "./routes/common/index.route.js";
import companyRoute from "./routes/company/index.route.js";
import dotenv from "dotenv";
import connectDB from "./configs/database.js";

import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { SYSTEM } from "./configs/system.js";

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN_URL || "http://localhost:5173",
    credentials: true,
  },
});

const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room user_${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

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
  });
  next();
});

app.use(SYSTEM.PATH_AUTH, authRoute);
app.use(SYSTEM.PATH_ADMIN, adminRoute);
app.use(SYSTEM.PATH_COMPANY, companyRoute);
app.use(SYSTEM.PATH_ADMIN, adminRoute);
app.use(SYSTEM.PATH_CLIENT, clientRoute);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export { io };
