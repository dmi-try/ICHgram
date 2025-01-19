import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import Follow from "../models/followModel.js";
import Like from "../models/likeModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, fullname } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const ifExisted = await User.findOne({ email });
    if (ifExisted) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const newUser = new User({ name, email, password, fullname });
    await newUser.save();

    res.status(201).json({ message: "User has been successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid login data" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.posts = await Post.find({ user: req.user });
    user.followers = await Follow.find({ user: req.user });
    user.following = await Follow.find({ follower: req.user });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error loading the profile:", error);
    res.status(500).json({ messaage: "Cannot load data" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.fullname) updates.fullname = req.body.fullname;
    if (req.body.bio) updates.bio = req.body.bio;

    const user = await User.findByIdAndUpdate(req.user, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    console.error("Error updating the profile: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user });
    await Comment.deleteMany({ user: req.user });
    await Like.deleteMany({ user: req.user });
    await Follow.deleteMany({ user: req.user });
    await User.findByIdAndDelete(req.user);
    res.json({ message: "User has been successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error: ", error: error.message });
  }
};
