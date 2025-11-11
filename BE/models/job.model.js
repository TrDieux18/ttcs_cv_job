import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    location: { type: String, required: true, default: "Remote" },
    salary: { type: String, trim: true },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    category: { type: String, trim: true },
    isFeatured: {
      type: Boolean,
      default: false,
    },

    requirements: { type: String },
    benefits: { type: String },
    level: { type: String, default: "Nhân viên" },
    genderRequirement: { type: String, default: "Không yêu cầu" },
    hiringQuantity: { type: Number, default: 1 },
    degreeRequirement: { type: String, default: "Không yêu cầu" },
    experienceRequirement: {
      type: String,
      default: "Không yêu cầu kinh nghiệm",
    },
    applicationDeadline: { type: Date },
    specificAddress: { type: String },
    keywords: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

jobSchema.index({
  title: "text",
  description: "text",
  category: "text",
  keywords: "text",
});
const Job = mongoose.model("Job", jobSchema, "jobs");
export default Job;
