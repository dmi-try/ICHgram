import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Follow from "../models/followModel.js";

export const getUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const query = name ? { name: { $regex: new RegExp(name, "i") } } : {};

    const users = await User.find(query, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    user.posts = await Post.find({ userId: req.params.id });
    user.followers = await Follow.find({ user: req.params.id }); // показывать не список, а количество документов
    user.following = await Follow.find({ follower: req.params.id }); // аналогично предыдущему
    // добавить поле инфо о наличиии/отсутствии подписки от залогиненного пользователя, чтобы
    //знать какую кнопку отображать на клиенте
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
