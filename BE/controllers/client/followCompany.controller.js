import { Types } from "mongoose";
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
      return res
        .status(400)
        .json({ success: false, message: "Theo dõi công ty thất bại" });
    }
    console.log("Created Follow:", createdFollow);
    res.status(201).json({ success: true, data: createdFollow });
  } catch (error) {
    console.error("Error in followCompany:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unfollowCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    console.log("Company ID to unfollow:", companyId);

    const deletedFollow = await FollowCompany.findOneAndDelete({
      company: new Types.ObjectId(companyId),
    });
    if (!deletedFollow) {
      return res
        .status(400)
        .json({ success: false, message: "Hủy theo dõi công ty thất bại" });
    }
    res.status(200).json({ success: true, data: deletedFollow });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFollowedCompaniesByUser = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const followedCompanies = await FollowCompany.find({
      user: new Types.ObjectId(userId),
    }).populate({
      path: "company",
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
