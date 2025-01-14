export const addLike = async (req, res) => {
  try {
    const { postId } = req.id;
    const like = new Like({ postId, userId: req.userId });
    await like.save();
    res.status(201).json({ message: "Like has been added" });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const deleteLike = async (req, res) => {
  try {
    await Like.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Like has been deleted" });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ message: "Server error" });
  }
}
