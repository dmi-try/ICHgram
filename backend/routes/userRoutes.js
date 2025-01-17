import express from "express";
import { getUsers, getUser } from "../controllers/userController.js";
import { addFollow, deleteFollow } from "../controllers/followController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers); //+

router.get("/:id", authMiddleware, getUser); //+

router.post("/:id/follow", authMiddleware, addFollow); //+
router.delete("/:id/follow", authMiddleware, deleteFollow);

export default router;
