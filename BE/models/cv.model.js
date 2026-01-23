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
    certificates: { type: [Object], default: [] },
    awards: { type: [Object], default: [] },
    githubLink: { type: String, default: null },
    aiScore: {
      overallScore: { type: Number, default: 0 },
      scores: {
        completeness: { type: Number, default: 0 },
        skillsQuality: { type: Number, default: 0 },
        experienceQuality: { type: Number, default: 0 },
        educationQuality: { type: Number, default: 0 },
        presentation: { type: Number, default: 0 },
      },
      analysis: { type: String, default: "" },
      suggestions: { type: [String], default: [] },
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      lastScored: { type: Date, default: null },
    },
  },
  {
    timestamps: true,
  }
);

const CV = mongoose.model("CV", cvSchema, "cvs");
export default CV;
