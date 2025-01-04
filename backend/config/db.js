import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to ICHgramDB");
  } catch (error) {
    console.error("Failed to connect due: ", error);
    process.exit(1);
  }
};
