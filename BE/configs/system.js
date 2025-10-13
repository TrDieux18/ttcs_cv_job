import dotenv from "dotenv";
dotenv.config();

export const SYSTEM = {
  PATH_ADMIN: "/admin",
  PATH_CLIENT: "/",
};

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRES_IN = "1d";
