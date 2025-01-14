export const addFollow = async (req, res) => {
  try {
    const follower = req.user
    const user = req.params.id
      const follow = new Follow({ user, follower });
    await follow.save();
    res.status(201).json({ message: "Follow has been added" });
  } catch (error) {
    console.error("Error adding follow:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const deleteFollow = async (req, res) => {
  try {
    await Follow.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Follow has been deleted" });
  } catch (error) {
    console.error("Error deleting follow:", error);
    res.status(500).json({ message: "Server error" });
  }
}
