import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  text: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
