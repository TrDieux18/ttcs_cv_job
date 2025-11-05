import Job from "../../models/job.model.js";
import Company from "../../models/company.model.js";

// ✅ GET MY JOBS (Company user - jobs của công ty mình)
export const getMyJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, keyword = "" } = req.query;

    // Tìm company của user
    const company = await Company.findOne({ user: userId });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Bạn chưa có công ty",
      });
    }

    const filter = { company: company._id };

    // Search keyword
    if (keyword && keyword.trim()) {
      const regex = new RegExp(keyword.trim(), "i");
      filter.$or = [
        { title: regex },
        { description: regex },
        { category: regex },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .populate("company", "headline logo location")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Job.countDocuments(filter),
    ]);

    return res.json({ success: true, data: jobs, total });
  } catch (error) {
    console.error("getMyJobs error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET MY JOB BY ID (Company user)
export const getMyJobById = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;

    const company = await Company.findOne({ user: userId });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Bạn chưa có công ty",
      });
    }

    const job = await Job.findOne({
      _id: jobId,
      company: company._id,
    }).populate("company");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job không tồn tại hoặc không thuộc công ty của bạn",
      });
    }

    return res.json({ success: true, data: job });
  } catch (error) {
    console.error("getMyJobById error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ CREATE JOB (Company user)
export const createMyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      title,
      description,
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
    } = req.body;

    // Tìm company của user
    const company = await Company.findOne({ user: userId });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Bạn chưa có công ty. Vui lòng tạo công ty trước.",
      });
    }

    // Validate required
    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, description và location là bắt buộc",
      });
    }

    const job = new Job({
      title,
      description,
      company: company._id,
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
    });

    const saved = await job.save();
    const populated = await Job.findById(saved._id).populate("company");

    return res.status(201).json({ success: true, data: populated });
  } catch (error) {
    console.error("createMyJob error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE MY JOB (Company user)
export const updateMyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;
    const {
      title,
      description,
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
    } = req.body;

    const company = await Company.findOne({ user: userId });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Bạn chưa có công ty",
      });
    }

    const job = await Job.findOne({ _id: jobId, company: company._id });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job không tồn tại hoặc không thuộc công ty của bạn",
      });
    }

    // Update fields
    if (title) job.title = title;
    if (description) job.description = description;
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

    const updated = await job.save();
    const populated = await Job.findById(updated._id).populate("company");

    return res.json({
      success: true,
      message: "Cập nhật job thành công",
      data: populated,
    });
  } catch (error) {
    console.error("updateMyJob error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE MY JOB (Company user)
export const deleteMyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;

    const company = await Company.findOne({ user: userId });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Bạn chưa có công ty",
      });
    }

    const deleted = await Job.findOneAndDelete({
      _id: jobId,
      company: company._id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Job không tồn tại hoặc không thuộc công ty của bạn",
      });
    }

    return res.json({ success: true, message: "Xóa job thành công" });
  } catch (error) {
    console.error("deleteMyJob error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
