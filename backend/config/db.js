// database connection file to MongoDB
import { mongoose } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDB = async () => {
  try {
    console.log(`Connecting to MongoDB database...`.yellow.underline);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected 😍 : ${conn.connection.host}`.cyan.underline);
    console.log(`MongoDB connection successfull🔥`.green.underline);
  } catch (err) {
    console.error(
      `MongoDB connection error: ${err.message}`.red.underline.bold
    );
    process.exit(1);
  }
};

export default connectDB;
