import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(
      `MongoDB Connected: ${conn.connection.host.toString().toUpperCase()}`
    );

    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDb;
