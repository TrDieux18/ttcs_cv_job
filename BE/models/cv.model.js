import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    fileUrl: { type: String, default: null },
    skills: { type: [Object], default: [] },
    experience: { type: [Object], default: [] },
    education: { type: [Object], default: [] },
    projects: { type: [Object], default: [] },
    githubLink: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const CV = mongoose.model("CV", cvSchema, "cvs");
export default CV;
