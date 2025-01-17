import mongoose from "mongoose";

export const followSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

followSchema.index({ user: 1, follower: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);

export default Follow;
