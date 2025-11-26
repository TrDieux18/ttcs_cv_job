import mongoose from "mongoose";

const followCompanySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

const FollowCompany = mongoose.model(
  "FollowCompany",
  followCompanySchema,
  "followCompany"
);

export default FollowCompany;
