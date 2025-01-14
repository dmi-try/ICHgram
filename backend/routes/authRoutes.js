import express from "express";

import { registerUser, loginUser, getProfile, updateProfile, deleteProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);
router.delete("/profile", authMiddleware, deleteProfile);


export default router;
