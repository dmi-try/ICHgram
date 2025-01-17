import app from './app.js';
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
