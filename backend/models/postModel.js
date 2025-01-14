import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photo: { type: String, required: true },
  text: { type: String, default: "" }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
