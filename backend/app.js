import express from "express";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
