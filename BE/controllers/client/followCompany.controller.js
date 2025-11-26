import FollowCompany from "../../models/followCompany.model.js";

export const followCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const userId = res.locals.user.id;
    const createdFollow = await FollowCompany.create({
      user: new Types.ObjectId(userId),
      company: new Types.ObjectId(companyId),
    });
    if (!createdFollow) {
      return res.status(400).json({ message: "Theo dõi công ty thất bại" });
    }
    res.status(201).json({ success: true, data: createdFollow });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unfollowCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const userId = res.locals.user.id;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFollowedCompaniesByUser = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const followedCompanies = await FollowCompany.find({
      user: new Types.ObjectId(userId),
    });
    if (!followedCompanies) {
      return res
        .status(400)
        .json({ message: "Lấy danh sách công ty theo dõi thất bại" });
    }
    res.status(200).json({ success: true, data: followedCompanies });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
