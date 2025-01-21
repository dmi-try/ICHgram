import Like from "../models/likeModel.js";

export const addLike = async (req, res) => {
  try {
    const postId = req.params.id;

    const ifLiked = await Like.findOne({ post: postId, user: req.user });
    if (ifLiked) {
      return res.status(400).json({ message: "You liked it" });
    }

    const like = new Like({ post: postId, user: req.user });
    await like.save();

    res.status(201).json({ message: "Like has been added" });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const like = await Like.findOneAndDelete({ post: postId, user: req.user });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ message: "Like has been deleted" });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
