import express from "express";
import dotenv from "dotenv";
import fs from "fs/promises";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hi there!");
});

app.get("/version", async (req, res) => {
  try {
    const data = await fs.readFile("./VERSION.txt", "utf-8");
    res.status(200).send(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).send("unknown");
    } else {
      console.error("Error reading file: ", error);
      res.status(500).json({ error: "Failed to read version file" });
    }
  }
});

// Обработка необработанных маршрутов
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Глобальная обработка ошибок
app.use((err, req, res, next) => {
  console.error("Unexpected error: ", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

export default app;
