import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import { string } from "yup";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: [2, "Name should be at least 2 characters"],
    maxlength: [50, "Name should be less than 50 characters"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should be at least 8 characters"],
    maxlength: [200, "Password should be less than 50 characters"],
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error(error);
    return false;
  }
};
const User = mongoose.model("User", userSchema);

export default User;
