import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Follow from "../models/followModel.js";

export const getUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const query = name ? { name: { $regex: new RegExp(name, "i") } } : {};

    const users = await User.find(query, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({ user: req.params.id });
    const followersCount = await Follow.countDocuments({ user: req.params.id });
    const followingCount = await Follow.countDocuments({
      follower: req.params.id,
    });

    const isFollowing = await Follow.findOne({
      user: req.params.id,
      follower: req.user,
    });

    res.status(200).json({
      ...user,
      posts,
      followersCount,
      followingCount,
      isFollowing: !!isFollowing,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
