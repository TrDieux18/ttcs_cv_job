import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    headline: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    logo: {
      url: { type: String, default: null },
      public_id: { type: String, default: null },
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    size: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema, "companies");

export default Company;
