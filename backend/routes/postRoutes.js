import express from "express";
// import {
//   getUsers,
//   getUser,
//   updateProfile,
// } from "../controllers/userController.js";
import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { addComment, deleteComment } from "../controllers/commentController.js";
import { addLike, deleteLike } from "../controllers/likeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPosts);
router.post("/", authMiddleware, upload.single("photo"), addPost); //+

router.get("/:id", authMiddleware, getPost); //+
router.patch("/:id", authMiddleware, updatePost); //+
router.delete("/:id", authMiddleware, deletePost); //+

router.post("/:id/comments", authMiddleware, addComment); //+
router.delete("/:id/comments/:commentId", authMiddleware, deleteComment); //+

router.post("/:id/like", authMiddleware, addLike); //+
router.delete("/:id/like", authMiddleware, deleteLike); //+

export default router;
