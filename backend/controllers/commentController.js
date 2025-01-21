import mongoose from "mongoose";
import Comment from "../models/commentModel.js";

export async function addComment(req, res) {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    if (!text || !postId) {
      return res.status(400).json({ message: "Post ID and text are required" });
    }

    const comment = new Comment({ text, post: postId, user: req.user });

    await comment.save();

    res.status(201).json({ message: "Comment has been added", comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error", error: error.mrssage });
  }
}

export async function deleteComment(req, res) {
  try {
    const { id: postId, commentId } = req.params;

    // Проверка валидности ID
    if (
      !mongoose.Types.ObjectId.isValid(postId) ||
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      return res.status(400).json({ message: "Invalid ID's" });
    }

    // Поиск комментария
    const comment = await Comment.findById({ _id: commentId, post: postId });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Удаление комментария
    await comment.deleteOne();
    res.status(200).json({ message: "Comment has been deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
