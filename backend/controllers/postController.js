import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Like from "../models/likeModel.js";
import Comment from "../models/commentModel.js";

export const getPosts = async (req, res) => {
  try {
    const user = req.query.user;
    const explore = req.query.explore || !user;

    let posts;

    if (explore) {
      // Если режим "исследования", получаем все посты
      posts = await Post.find().populate("userId", "name");
    } else {
      // Ищем пользователей, которых фолловит текущий
      const users = await User.find({ followers: req.userId });
      const userIds = users.map((user) => user._id);

      // Получаем посты только этих пользователей
      posts = await Post.find({ userId: { $in: userIds } }).populate(
        "userId",
        "name"
      );
    }

    // Получаем данные для постов параллельно
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const isLiked = await Like.findOne({
          postId: post._id,
          userId: req.userId,
        });
        const commentCount = await Comment.countDocuments({ postId: post._id });
        const likeCount = await Like.countDocuments({ postId: post._id });

        return {
          ...post.toJSON(),
          isLiked: !!isLiked,
          commentCount,
          likeCount,
        };
      })
    );

    res.status(200).json(updatedPosts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: req.params.id }).populate(
      "user",
      "name"
    );

    const likeCount = await Like.countDocuments({
      post: req.params.id,
    });

    const isLiked = !!(await Like.findOne({
      post: req.params.id,
      user: req.user,
    }));

    const response = {
      ...post.toJSON(),
      comments,
      likeCount,
      isLiked,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const { img, text } = req.body;
    const post = new Post({ photo: img, text, user: req.user });
    await post.save();
    res.status(201).json({ message: "Post has been added" });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { img, text } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, // Проверяем, что пост принадлежит текущему пользователю
      { photo: img, text },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }
    res.status(200).json({ message: "Post has been updated" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user, // Проверяем, что пост принадлежит текущему пользователю
    });

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }
    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};
