import Job from "../../models/job.model.js";
import Company from "../../models/company.model.js";

// ✅ GET ALL JOBS (Admin - quản lý tất cả jobs)
export const getAllJobsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = "", status = "all" } = req.query;

    const filter = {};

    // Search keyword
    if (keyword && keyword.trim()) {
      const regex = new RegExp(keyword.trim(), "i");
      filter.$or = [
        { title: regex },
        { description: regex },
        { category: regex },
        { location: regex },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .populate({
          path: "company",
          select: "headline logo location user",
          populate: { path: "user", select: "fullName email" },
        })
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Job.countDocuments(filter),
    ]);

    return res.json({ success: true, data: jobs, total });
  } catch (error) {
    console.error("getAllJobsAdmin error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET JOB BY ID (Admin)
export const getJobByIdAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id).populate({
      path: "company",
      select: "headline logo location website user",
      populate: { path: "user", select: "fullName email" },
    });

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

    return res.json({ success: true, data: job });
  } catch (error) {
    console.error("getJobByIdAdmin error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ CREATE JOB (Admin)
export const createJobAdmin = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      category,
      requirements,
      benefits,
      level,
      genderRequirement,
      hiringQuantity,
      degreeRequirement,
      experienceRequirement,
      applicationDeadline,
      specificAddress,
      keywords,
      isFeatured,
    } = req.body;

    // Validate required fields
    if (!title || !description || !company || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, description, company và location là bắt buộc",
      });
    }

    // Check company exists
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company không tồn tại",
      });
    }

    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      category,
      requirements,
      benefits,
      level,
      genderRequirement,
      hiringQuantity,
      degreeRequirement,
      experienceRequirement,
      applicationDeadline,
      specificAddress,
      keywords: keywords ? keywords.split(",").map((k) => k.trim()) : [],
      isFeatured: isFeatured || false,
    });

    const saved = await job.save();
    const populated = await Job.findById(saved._id).populate("company");

    return res.status(201).json({ success: true, data: populated });
  } catch (error) {
    console.error("createJobAdmin error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE JOB (Admin)
export const updateJobAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      category,
      requirements,
      benefits,
      level,
      genderRequirement,
      hiringQuantity,
      degreeRequirement,
      experienceRequirement,
      applicationDeadline,
      specificAddress,
      keywords,
      isFeatured,
    } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

    // Update fields
    if (title) job.title = title;
    if (description) job.description = description;
    if (company) job.company = company;
    if (location) job.location = location;
    if (salary !== undefined) job.salary = salary;
    if (jobType) job.jobType = jobType;
    if (category) job.category = category;
    if (requirements) job.requirements = requirements;
    if (benefits) job.benefits = benefits;
    if (level) job.level = level;
    if (genderRequirement) job.genderRequirement = genderRequirement;
    if (hiringQuantity) job.hiringQuantity = hiringQuantity;
    if (degreeRequirement) job.degreeRequirement = degreeRequirement;
    if (experienceRequirement)
      job.experienceRequirement = experienceRequirement;
    if (applicationDeadline) job.applicationDeadline = applicationDeadline;
    if (specificAddress) job.specificAddress = specificAddress;
    if (keywords)
      job.keywords = keywords.split(",").map((k) => k.trim());
    if (isFeatured !== undefined) job.isFeatured = isFeatured;

    const updated = await job.save();
    const populated = await Job.findById(updated._id).populate("company");

    return res.json({
      success: true,
      message: "Cập nhật job thành công",
      data: populated,
    });
  } catch (error) {
    console.error("updateJobAdmin error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE JOB (Admin)
export const deleteJobAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Job.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

    return res.json({ success: true, message: "Xóa job thành công" });
  } catch (error) {
    console.error("deleteJobAdmin error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
