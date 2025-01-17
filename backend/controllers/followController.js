import Follow from "../models/followModel.js";

export const addFollow = async (req, res) => {
  try {
    const followerId = req.user;
    const userId = req.params.id;

    if (followerId === userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const ifFollowExists = await Follow.findOne({
      user: userId,
      follower: followerId,
    });

    if (ifFollowExists) {
      return res.status(400).json({ message: "You are following this user" });
    }

    const follow = new Follow({ user: userId, follower: followerId });
    await follow.save();

    res.status(201).json({ message: "Follow has been added" });
  } catch (error) {
    console.error("Error following the user:", error);

    // доп. проверка
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteFollow = async (req, res) => {
  try {
    const followerId = req.user;
    const userId = req.params.id;

    const follow = await Follow.findOneAndDelete({
      user: userId,
      follower: followerId,
    });

    if (!follow) {
      return res.status(404).json({ message: "Follow relation not found" });
    }
    res.status(200).json({ message: "Follow has been deleted" });
  } catch (error) {
    console.error("Error deleting follow:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
