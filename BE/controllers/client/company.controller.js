import Company from "../../models/company.model.js";

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("user", "fullName email");
    res.json({ success: true, data: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
