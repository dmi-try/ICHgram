import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "invalid token format, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    const user = await User.findById(req.user, "-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: user is gone" });
    }


    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: token is invalid" });
  }
};

export default authMiddleware;
