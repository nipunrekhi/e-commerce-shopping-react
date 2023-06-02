import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import requestIp from "request-ip";
import Cart from "../models/cartModel.js";
const register = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password, address, phoneNumber, role } =
      req.body;
    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (email === process.env.ADMIN_EMAIL) {
      role == "Admin";
    }
    // Create a new user in the database
    const newUser = new User({
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      role,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the given email
    const user = await User.findOne({ email }).select("+password");
    // If no user is found, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    // If the email and password are correct, return the user information
    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.body = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      role: user.role,
      token,
    };
    res.status(200).json(res.body);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(200).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  }
});

const getIpAddress = asyncHandler(async (req, res) => {
  const ip = process.env.IP_ADDRESS; // Retrieve the IP address from the request object
  res.json({ ipAddress: ip });
});

const signInAsGuest = asyncHandler(async (req, res) => {
  const { guestEmail: email, guestPassword: password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res .status(400)
    .json({ error: "Email already registered Please Login!" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    email: email,
    password: hashedPassword,
  });
  await newUser.save();
   // Generate a JWT for the newly registered user
   const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // Update the userId in the cart collection
  await Cart.updateMany({ userId: process.env.IP_ADDRESS }, { $set: { userId: newUser._id } });

  res.status(201).json({ message: "User registered successfully" ,token});
});

export { register, login, getUserProfile, getIpAddress, signInAsGuest };
