import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
  }

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
