import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user, "-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error loading the profile:", error);
    res.status(500).json({ messaage: "Cannot load data" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = {};
    if (req.body.username) updates.name = req.body.username;
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
