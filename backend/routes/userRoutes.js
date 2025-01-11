import express from "express";
import {
  getUsers,
  getUser,
  updateProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/profile", authMiddleware, getUser);
router.patch("/profile", authMiddleware, updateProfile);

export default router;
