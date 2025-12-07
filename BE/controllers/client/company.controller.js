import Company from "../../models/company.model.js";
import Job from "../../models/job.model.js";

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("user", "fullName email");
    console.log("Companies fetched:", companies);
    res.json({ success: true, data: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCompanyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const company = await Company.findOne({ slug }).populate(
      "user",
      "fullName email"
    );

    const jobs = await Job.find({ company: company._id });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({
      success: true,
      data: {
        company,
        jobs,
      },
    });
  } catch (error) {
    console.error("Error fetching company by slug:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
