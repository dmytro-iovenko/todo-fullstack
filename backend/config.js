// bring in the moongose library for an easier database connetcion
import mongoose from "mongoose";

// create a function for more control of when the connection happen
async function connectDB() {
  try {
    // establish connection using the mongodb connection string (hidden in .env file)
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
}

export default connectDB;
